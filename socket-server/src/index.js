import http from "http";
import SocketIo from "socket.io";
import { each } from "lodash";

import Rooms from "./rooms";
import clientEvents from "./clientEvents";
import { success } from "./lib/log";

const server = http.createServer();
const io = SocketIo(server);
const rooms = new Rooms(io);

io.on("connection", client => {
  success("client connected");
  const { roomId, title } = client.handshake.query;
  const room = rooms.findOrCreate(roomId || "default", title);
  client.join(room.get("id"));

  each(clientEvents, (handler, event) => {
    client.on(event, handler.bind(null, { io, client, room }));
  });
});

const PORT = process.env.PORT || 4155;
server.listen(PORT, () => success(`socket server listening on port ${PORT}`));
