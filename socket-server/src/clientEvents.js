import axios from "axios";
import randomstring from "randomstring";

import { boardIds } from "./lib/constants";
import { isValidMove, isCheckOrMate, reverseBoard } from "./lib/boardHelpers";
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
  serverPlayerMove
} from "./serverEvents";

const matchQueue = new Queue();

const clientPlayMatch = ({ io, client, room }, payload) => {
  success("client play match heard");
  try {
    matchQueue.enqueue(payload);
    let matchid, black, white;
    if (matchQueue.size() > 1) {
      matchId = randomstring.generate();
      black = matchQueue.dequeue().username;
      white = matchQueue.dequeue().username;
    }
    clientGameReady({ io, client, room }, {matchId, black, white});
  } catch (err) {
    error("client play match error", err);
  }
  serverJoinMatch({ io, client, room }, payload);
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
    let result = await axios.get("http://localhost:3396/api/matches", {
      params: { matchId, black, white }
    });
    if (result.data.length <  2) {
      result = await axios.post("http://localhost:3396/api/matches", {
        matchId,
        board: JSON.stringify(room.get("board")),
        black,
        white,
        hand_white: "[]",
        hand_black: "[]"
      });
    }
    room.set("black", result.data[1].id);
    room.set("white", result.data[2].id);
    serverGameReady({ io, client, room }, result.data);
  } catch (err) {
    error("error creating game. e = ", err);
  }
};

const clientListGames = async ({ io, client, room }) => {
  success("list open games");
  serverUpdateGames({ io, client, room });
};

const clientSubmitMove = async ({ io, client, room }, payload) => {
  try {
    let { matchId, before, after, move } = payload;
    let { data } = await axios.get("http://localhost:3396/api/matches", {
      params: { matchId }
    });
    data = data[0];
    // validation
    let messages = [];
    // turn and user match
    let correctTurn =
      (data.turn === 1 && move.color === "black") ||
      (data.turn === 0 && move.color === "white");
    if (!correctTurn)
      messages.push("Move submitted was not for the correct turn.");
    // move is valid
    let validMove = isValidMove(before.board, new GameTile(boardIds[move.piece[0].toLowerCase()], move.color, move.from, move.piece.length > 1), move.to);
    if (!validMove) messages.push('Invalid move');
    // board state is check or checkmate
    let check = false;
    let checkmate = false;
    //let [check, checkmate] = isCheckOrMate(after.board, after.kings, new GameTile(boardIds[move.piece.toLowerCase()], move.color, move.to, move.piece.length > 1));
    let gameStatus = data.status || 0;
    if (check && !checkmate) gameStatus = 1;
    if (check && checkmate) gameStatus = 2;
    // save new state if the move was successful
    let success = correctTurn && validMove;
    // if (success) {
    // orient board to default
    let savedBoard =
      move.color === "black" ? reverseBoard(after.board) : after.board;
    // prep event log
    let eventLog = data.event_log || [];
    let event = {
      moveNumber: eventLog.length + 1,
      notation: moveToString(move),
      move
    };
    eventLog.push(event);
    await axios.put("http://localhost:3396/api/matches", {
      matchId,
      board: JSON.stringify(savedBoard),
      status: gameStatus,
      turn: data.turn ? 0 : 1,
      hand_white: JSON.stringify(after.white),
      hand_black: JSON.stringify(after.black),
      event_log: JSON.stringify(eventLog)
    });
    // }
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
  "client.playMatch": clientPlayMatch,
  "client.update": clientUpdate,
  "client.disconnect": clientDisconnect,
  // "client.run": clientRun,
  "client.fetchMessages": clientFetchMessages,
  "client.gameReady": clientGameReady,
  "client.homeChat": clientHomeChat,
  "client.gameChat": clientGameChat,
  "client.listOpenGames": clientListGames,
  "client.submitMove": clientSubmitMove
};

export default clientEmitters;
