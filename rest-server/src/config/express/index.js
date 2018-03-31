import express from "express";
import parser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import router from "../../routes/index";

const middleWare = [
  helmet(),
  parser.json(),
  parser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: "Content-Type, Authorization",
    methods: ["GET, POST, PUT, DELETE", "OPTIONS"]
  })
];

class App {
  constructor() {
    this.express = express();
    this.mountMiddleWare();
    this.mountRoutes();
  }

  mountMiddleWare() {
    this.express.use(...middleWare);
  }

  mountRoutes() {
    this.express.use("/api", router);
  }
}

export default new App();
