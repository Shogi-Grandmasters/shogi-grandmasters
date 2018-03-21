import axios from 'axios';

import { boardIds } from './lib/constants';
import { isValidMove, isCheckOrMate, reverseBoard } from './lib/boardHelpers';
import { moveToString } from './lib/matchLog';
import GameTile from './lib/GameTile';
import { success, log, error } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverLoadMessages,
  serverGameReady,
  serverSendMessages,
  serverHomeChat,
  serverGameChat,
  serverUpdateGames
} from "./serverEvents";

const clientReady = ({ io, client, room }, payload) => {
  success("client ready heard");
  serverInitialState({ io, client, room }, payload);
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
  success("client update heard. payload.text = ", payload);
  room.set("text", text);
  room.set("email", email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, client, room }) => {
  success("client disconnected");
  serverLeave({ io, client, room });
};

// const clientRun = async ({ io, client, room }, payload) => {
//   success('running code from client. room.get("text") = ', room.get("text"));
//   const { text, email, challenge_id, challenge_title } = payload;
//   const url = process.env.CODERUNNER_SERVICE_URL;
//   const testCase = await axios.get(
//     `http://localhost:3396/api/testCases/${challenge_id}`
//   );
//   const title = `const func = ${challenge_title};`;
//   const input = text + title + testCase.data.rows[0].content;
//   try {
//     const { data } = await axios.post(`${url}/submit-code`, { code: input });
//     const stdout = data;
//     serverRun({ io, client, room }, { stdout, email });
//   } catch (e) {
//     success("error posting to coderunner service from socket server. e = ", e);
//   }
// };

const clientFetchMessages = async ({ io, client, room }, payload) => {
  success("client load message request heard");
  try {
    const { data } = await axios.get("http://localhost:3396/api/messages", {
      params: { matchId: room.get("id") }
    });
    serverSendMessages({ io, client, room }, data);
  } catch (err) {
    error("error fetching messages from database. e = ", err);
  }
};

const clientHomeChat = async ({ io, client, room }, payload) => {
  success("client home chat heard");
  try {
    await axios.post("http://localhost:3396/api/messages", {
      matchId: room.get("id"),
      message: payload.content,
      username: payload.username
    });
    serverHomeChat({ io, client, room }, payload);
  } catch (err) {
    error("client home chat error: ", err);
  }
};

const clientGameChat = async ({ io, client, room }, payload) => {
  success("client game chat heard");
  try {
    serverGameChat({ io, client, room }, payload);
  } catch (err) {
    error("client game chat error: ", err);
  }
};

const clientGameReady = async ({ io, client, room }, payload) => {
  success("client opponent joined");
  try {
    let { matchId, black, white } = payload;
    let { data } = await axios.get("http://localhost:3396/api/matches", {
      params: { matchId }
    });
    !data.length &&
      (await axios.post("http://localhost:3396/api/matches", {
        matchId,
        board: JSON.stringify(room.get("board")),
        black,
        white,
        hand_white: "[]",
        hand_black: "[]"
      }));
    payload.board = data.length ? data[0].board : room.get("board");
    payload.hand_black = data.length ? data[0].hand_black : [];
    payload.hand_white = data.length ? data[0].hand_white : [];
    room.set("waiting", false);
    serverGameReady({ io, client, room }, payload);
  } catch (err) {
    error("error creating game. e = ", err);
  }
};

const clientListGames = async ({ io, client, room }) => {
  success("list open games");
  serverUpdateGames({ io, client, room });
};

const clientSelectedPiece = async ({ io, client, room }, payload) => {
  // deconstruct payload
  let { matchId, board, piece, location } = payload;
  // create GameTile instance
  // generate hint tiles
  //  if location == [10,10] > validDropLocations
  //  else > validMoves
  // invert hint coords for opponent display

}

const clientDeselectedPiece = async ({ io, client, room }, payload) => {

}

const clientSubmitMove = async ({ io, client, room }, payload) => {
  try {
    let { matchId, before, after, move } = payload;
    let { data } = await axios.get("http://localhost:3396/api/matches", {
      params: { matchId }
    });
    // validation
    let messages = [];
    // turn and user match
    let correctTurn = data.turn === 1 && move.color === 'black' || data.turn === 0 && move.color === 'white';
    if (!correctTurn) messages.push('Move submitted was not for the correct turn.');
    // move is valid (solver server?)
    let validMove = true;
    // let validMove = isValidMove(after.board, new GameTile(boardIds[move.piece.toLowerCase()], move.color, move.from, move.didPromote), move.to);
    // if (!validMove) messages.push('Invalid move');
    // board state is check or checkmate
    let check = false;
    let checkmate = false;
    //let [check, checkmate] = isCheckOrMate(after.board, after.kings, new GameTile(boardIds[move.piece.toLowerCase()], move.color, move.to, move.didPromote));
    let gameStatus = data.status;
    if (check && !checkmate) gameStatus = 1;
    if (check && checkmate) gameStatus = 2;
    // save new state if the move was successful
    let success = correctTurn && validMove;
    // if (success) {
    await axios.put("http://localhost:3396/api/matches", {
      matchId,
      board: JSON.stringify(after.board),
      status: gameStatus,
      turn: data.turn ? 0 : 1,
      hand_white: JSON.stringify(after.white),
      hand_black: JSON.stringify(after.black),
    });
    // }
    payload.log = moveToString(move);
    payload.status = {
      success,
      check,
      checkmate,
      messages
    };
    // broadcast move
    serverPlayerMove({ io, client, room }, payload);
  }
  catch (err) {
    error('issue validating player move, e = ', err);
  }
}

const clientEmitters = {
  "client.ready": clientReady,
  "client.update": clientUpdate,
  "client.disconnect": clientDisconnect,
  // "client.run": clientRun,
  "client.fetchMessages": clientFetchMessages,
  "client.gameReady": clientGameReady,
  "client.homeChat": clientHomeChat,
  "client.gameChat": clientGameChat,
  "client.listOpenGames": clientListGames,
  "client.submitMove": clientSubmitMove,
};

export default clientEmitters;
