import { success, error } from "./lib/log";

export const serverInitialState = ({ client, room }, payload) => {
  if (!room.get("match")) {
    room.set("match", payload);
    client.emit("server.initialState", {
      id: client.handshake.query.username,
      match: payload
    });
  } else {
    client.emit("server.initialState", {
      id: client.handshake.query.username,
      match: room.get("match")
    });
  }
};

export const serverChanged = ({ io, room }) => {
  const roomId = room.get("id");
  const text = room.get("text");
  const email = room.get("email");
  io.in(roomId).emit("server.changed", { text, email });
};

export const serverLeave = ({ io, room }) => {
  io.in(room.get("id")).emit("server.leave");
};

export const serverRun = ({ io, room }, { stdout, email }) => {
  io.in(room.get("id")).emit("server.run", { stdout, email });
};

export const serverLoadMessages = ({ io, room }, messages) => {
  error("serverloadmessages: ", messages);
  io.in(room.get("id")).emit("server.loadMessages", messages);
};

export const serverGameReady = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.joined", payload);
};

export const serverSendMessages = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.sendMessages", payload);
};

export const serverSendPopupMessages = ({ io, client, room }, payload) => {
  const { userId } = client.handshake.query;
  io.in(room.get("id")).emit(`server.sendPopupMessages${userId}`, payload);
};

export const serverHomeChat = ({ io, room }, messages) => {
  io.in(room.get("id")).emit("server.homeChat", messages);
};

export const serverPopupChat = ({ io, room }, messages) => {
  io.in(room.get("id")).emit("server.popupChat", messages);
};

export const serverUpdateGames = ({ io, room }) => {
  io.in(room.get("id")).emit("updateOpenMatches");
};

export const serverPlayerMove = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.playerMove", payload);
};

export const serverConcludeMatch = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.concludeMatch", payload);
};

export const serverJoinMatch = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.joinMatch", payload);
};

export const serverChallengeSent = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.challengeSent", payload);
};

export const serverChallengeAccepted = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.challengeAccepted", payload);
};

export const serverChallengeRejected = ({ io, client, room }, payload) => {
  io.in(room.get("id")).emit("server.challengeRejected", payload);
};
