import axios from "axios";

import { success, error } from "./lib/log";
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
    const { data } = await axios.get("http://localhost:3396/api/messages");
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
    await axios.post("http://localhost:3396/api/matches", {
      matchId,
      board: JSON.stringify(data.board) || JSON.stringify(room.get("board")),
      black,
      white,
      hand_white: JSON.stringify(data.hand_black) || "[]",
      hand_black: JSON.stringify(data.hand_white) || "[]"
    });
    payload.board = data.board || room.get("board");
    payload.hand_black = data.hand_black || [];
    payload.hand_white = data.hand_white || [];
    serverGameReady({ io, client, room }, payload);
  } catch (err) {
    error("error creating game. e = ", err);
  }
};

const clientListGames = async ({ io, client, room }) => {
  success("list open games");
  serverUpdateGames({ io, client, room });
};

const clientEmitters = {
  "client.ready": clientReady,
  "client.update": clientUpdate,
  "client.disconnect": clientDisconnect,
  // "client.run": clientRun,
  "client.fetchMessages": clientFetchMessages,
  "client.gameReady": clientGameReady,
  "client.homeChat": clientHomeChat,
  "client.gameChat": clientGameChat,
  "client.listOpenGames": clientListGames
};

export default clientEmitters;
