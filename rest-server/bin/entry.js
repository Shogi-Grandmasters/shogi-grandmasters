require("babel-register");
require("babel-polyfill");

const fs = require("fs");
const path = require("path");
const env = require("dotenv");

if (!fs.readFileSync(path.resolve(__dirname, "../.env"))) {
  console.log(
    ".env configuration file must exist inside of the rest-server root"
  );
  process.exit();
}

env.config({
  path: path.resolve(__dirname, "../.env")
});

require("../src");
