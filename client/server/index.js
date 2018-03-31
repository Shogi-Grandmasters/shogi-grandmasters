const express = require("express");
const path = require("path");

const server = express();
const PORT = process.env.PORT || 1337;

server.use(express.static(path.join(__dirname, "../public")));

server.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
);

server.listen(PORT, () => console.log("serving static files on port ", PORT));
