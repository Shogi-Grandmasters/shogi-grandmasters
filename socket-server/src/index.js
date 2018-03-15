import http from "http";
import SocketIo from "socket.io";
import { each } from "lodash";
import Redis from "redis";

import Rooms from "./rooms";
import clientEvents from "./clientEvents";
import { success, error } from "./lib/log";

const server = http.createServer();
const io = SocketIo(server);
const rooms = new Rooms(io);
let clientCache;

io.on("connection", client => {
  success("client connected");
  const { roomId } = client.handshake.query;
  const room = rooms.findOrCreate(roomId || "default");
  client.join(room.get("id"));

  const clientCache = Redis.createClient();
  clientCache.on("error", err => {
    error("Something went wrong ", err);
  });

  each(clientEvents, (handler, event) => {
    client.on(event, handler.bind(null, { io, client, room, clientCache }));
  });
});

const PORT = process.env.PORT || 4155;
server.listen(PORT, () => success(`socket server listening on port ${PORT}`));
