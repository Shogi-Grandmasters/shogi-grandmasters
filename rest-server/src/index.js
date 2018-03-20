import http from "http";

import App from "./config/express";
import { success } from "./lib/log";
import "./config/database";
<<<<<<< HEAD
// import './config/database/setup';  //-- this resets the databases
=======
//import './config/database/setup';  //-- this resets the databases
>>>>>>> wrote update to update player ratings

const app = App.express;

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, err => {
  if (err) throw new Error();
  success("successfully connected to rest-server port ", PORT);
});
