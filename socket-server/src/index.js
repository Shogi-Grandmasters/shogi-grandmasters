import http from "http";
import SocketIo from "socket.io";
import { each } from "lodash";

import Rooms from "./rooms";
import clientEvents from "./clientEvents";
import { success, error } from "./lib/log";

const server = http.createServer();
const io = SocketIo(server);
const rooms = new Rooms(io);
let clientCache;

io.on("connection", client => {
  success("client connected");
  const { roomId, userId, username } = client.handshake.query;
  const room = rooms.findOrCreate(roomId || "default");
  client.join(room.get("id"));
  client.emit("server.connect", room.get("waiting"));

  each(clientEvents, (handler, event) => {
    client.on(event, handler.bind(null, { io, client, room }));
  });

  const users = room.get("users");

  if (userId && username) {
    if (users) {
      users[userId] = {userId, username, loggedOn: true};
      room.set("users", users);
    } else {
      room.set("users", {userId: userId, username, loggedOn: true});
    }
  }

  client.on("disconnect", () => {
    if (users) {
      users[userId].loggedOn = false;
      room.set("users", users);
    }
    console.log(room);
  });
});

const PORT = process.env.PORT || 4155;
server.listen(PORT, () => success(`socket server listening on port ${PORT}`));
