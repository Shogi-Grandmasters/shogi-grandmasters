import http from "http";

import App from "./config/express";
import { success } from "./lib/log";
import "./config/database";
import "../src/lib/updateLeaderboard";
// import './config/database/setup';  //-- this resets the databases

const app = App.express;

const server = http.createServer(app);
const PORT = process.env.PORT || 3996;

server.listen(PORT, err => {
  if (err) throw new Error();
  success("successfully connected to rest-server port ", PORT);
});
