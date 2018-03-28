import axios from "axios";
import randomstring from "randomstring";

import { boardIds } from "./lib/constants";
import { isValidMove, isCheckOrMate, reverseBoard, pieceNameFromBoardId } from "./lib/boardHelpers";
import { endMatch } from './lib/ratingHelpers';
import { moveToString } from "./lib/matchLog";
import GameTile from "./lib/GameTile";
import { success, log, error } from "./lib/log";
import { Queue } from "./lib/matchHelpers";
import {
  serverJoinMatch,
  serverChanged,
  serverLeave,
  serverRun,
  serverLoadMessages,
  serverGameReady,
  serverSendMessages,
  serverHomeChat,
  serverGameChat,
  serverUpdateGames,
  serverPlayerMove,
  serverConcludeMatch
} from "./serverEvents";

const { REST_SERVER_URL } = process.env;

const matchQueue = new Queue();

const clientJoinQueue = async ({ io, client, room }, userId) => {
  success("client join queue heard");
  try {
    matchQueue.enqueue(userId);
    if (matchQueue.size() > 1) {
      let matchId = randomstring.generate();
      let black = matchQueue.dequeue();
      let white = matchQueue.dequeue();
      if (black !== white) {
        await clientGameReady({ io, client, room }, { matchId, black, white });
        serverJoinMatch({ io, client, room }, { matchId, black, white });
      }
    }
  } catch (err) {
    error("client join queue error", err);
  }
};

const clientLeaveQueue = ({ io, client, room }, userId) => {
  success("client leave queue heard");
  try {
    matchQueue.pluck(userId);
  } catch (err) {
    error("client leave queue error", err);
  }
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
    const { data } = await axios.get(`${REST_SERVER_URL}/api/messages`, {
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
    await axios.post(`${REST_SERVER_URL}/api/messages`, {
      matchId: room.get("id"),
      message: payload.content,
      userId: payload.userId
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
    let result = await axios.get(`${REST_SERVER_URL}/api/matches`, {
      params: { matchId, black, white }
    });
    if (result.data.length <  3) {
      result = await axios.post(`${REST_SERVER_URL}/api/matches`, {
        matchId,
        board: JSON.stringify(room.get("board")),
        black,
        white,
        hand_white: "[]",
        hand_black: "[]"
      });
      room.set("black", result.data[1].id);
      room.set("white", result.data[2].id);
    }
    serverGameReady({ io, client, room }, result.data);
  } catch (err) {
    error("error creating game. e = ", err);
  }
};

const clientListGames = async ({ io, client, room }) => {
  success("list open games");
  serverUpdateGames({ io, client, room });
};

const clientConcede = async ({ io, client, room }, payload) => {
  try {
    let { matchId, winner, loser } = payload;
    let { data } = await axios.get(`${REST_SERVER_URL}/api/matches`, {
      params: { matchId }
    });
    // TODO:  need match type on Matches model
    // then, when match === ranked, update player ratings
    let { turn, board, hand_white, hand_black, event_log } = data[0];
    await axios.post(`${REST_SERVER_URL}/api/matches/end`, {
      matchId,
      status: 2,
      winner: JSON.stringify(winner),
      loser: JSON.stringify(loser)
    });
    serverConcludeMatch({ io, client, room}, { winner, loser });
  }
  catch (err) {
    error('issue conceding match, e = ', err);
  }
}

const clientSubmitMove = async ({ io, client, room }, payload) => {
  try {
    let { matchId, before, after, move, previous } = payload;
    let { data } = await axios.get(`${REST_SERVER_URL}/api/matches`, {
      params: { matchId }
    });
    // validation
    data = data[0];
    let messages = [];
    // turn and user match
    let correctTurn =
      (data.turn === 1 && move.color === "black") ||
      (data.turn === 0 && move.color === "white");
    if (!correctTurn)
      messages.push('Move submitted was not for the correct turn.');
    // move is valid
    let validMove = isValidMove(before, after, new GameTile(pieceNameFromBoardId(move.piece), move.color, move.from, move.piece.length > 1), move.to, previous);
    if (!validMove) messages.push('Invalid move');
    // board state is check or checkmate
    let [check, checkmate] = isCheckOrMate(after, new GameTile(pieceNameFromBoardId(move.piece), move.color, move.to, move.piece.length > 1));
    let gameStatus = data.status || 0;
    // save new state if the move was successful
    let success = correctTurn && validMove;
    // orient board to default
    let savedBoard = move.color === 'black' ? reverseBoard(after.board) : after.board;
    // prep event log
    let eventLog = data.event_log || [];
    let event = {
      moveNumber: eventLog.length + 1,
      notation: moveToString(move),
      move,
      check,
      checkmate
    };
    eventLog.unshift(event);
    await axios.put(`${REST_SERVER_URL}/api/matches`, {
      matchId,
      board: JSON.stringify(savedBoard),
      status: gameStatus,
      turn: data.turn ? 0 : 1,
      hand_white: JSON.stringify(after.white),
      hand_black: JSON.stringify(after.black),
      event_log: JSON.stringify(eventLog)
    });
    payload.log = eventLog;
    payload.status = {
      success,
      check,
      checkmate,
      messages
    };
    // broadcast move
    serverPlayerMove({ io, client, room }, payload);
  } catch (err) {
    error("issue validating player move, e = ", err);
  }
};

const clientEmitters = {
  "client.joinQueue": clientJoinQueue,
  "client.leaveQueue": clientLeaveQueue,
  "client.update": clientUpdate,
  "client.disconnect": clientDisconnect,
  // "client.run": clientRun,
  "client.fetchMessages": clientFetchMessages,
  "client.gameReady": clientGameReady,
  "client.homeChat": clientHomeChat,
  "client.gameChat": clientGameChat,
  "client.listOpenGames": clientListGames,
  "client.submitMove": clientSubmitMove,
  "client.concede": clientConcede,
};

export default clientEmitters;
