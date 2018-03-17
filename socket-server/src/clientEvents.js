import axios from "axios";

import { success, error } from "./lib/log";
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverLoadMessages,
  serverGameReady,
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

// const clientFetchMessages = async ({ io, client, room }, payload) => {
//   success("client load message request heard");
//   try {
//     await clientCache.get(`${room.get("id")}/messages`, (err, result) => {
//       result && serverGameChat({ io, client, room }, result);
//     });
//   } catch (err) {
//     error("error fetching messages from database. e = ", err);
//   }
// };

const clientGameChat = async ({ io, client, room }, payload) => {
  success("client game chat heard");
  try {
    serverGameChat({ io, client, room }, payload.messages);
  } catch (err) {
    error("client game chat error: ", err);
  }
};

const clientGameReady = async ({ io, client, room }, payload) => {
  success("client opponent joined");
  let { matchId, black, white } = payload;
  let { data } = await axios.get("http://localhost:3396/api/matches", {
    params: { matchId }
  });
  let board, hand_black, hand_white;
  if (data.length) {
    board = JSON.parse(data[0].board);
    hand_black = JSON.parse(data[0].hand_black);
    hand_white = JSON.parse(data[0].hand_white);
  }
  await axios.post("http://localhost:3396/api/matches", {
    matchId,
    board: board || room.get("board"),
    black,
    white,
    hand_white: hand_black || "[]",
    hand_black: hand_white || "[]"
  });
  serverGameReady({ io, client, room }, payload);
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
  // "client.fetchMessages": clientFetchMessages,
  "client.gameReady": clientGameReady,
  "client.gameChat": clientGameChat,
  "client.listOpenGames": clientListGames
};

export default clientEmitters;
