const fs = require("fs");
const path = require("path");
const envBuild = require("../config/.env.sample.js");

const buildEnv = () => {
  for (let pathname in envBuild) {
    fs.writeFileSync(__dirname + `/../${pathname}/.env`, "");
    envBuild[pathname].forEach(variable =>
      fs.appendFileSync(__dirname + `/../${pathname}/.env`, variable + "\n")
    );
  }
};

buildEnv();
