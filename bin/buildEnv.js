const fs = require("fs");
const path = require("path");
const config = require("../config/.env.js");
const environment = process.argv[2];

if (!config[environment]) {
  console.warn('Could not find a configuration for the environment provided');
  process.exit(1);
} else {
  console.log(`ENV:  Building environment for ${environment}`)
}

const buildEnv = () => {
  for (let pathname in config[environment]) {
    fs.writeFileSync(__dirname + `/../${pathname}/.env`, "");
    config[environment][pathname].forEach(variable =>
      fs.appendFileSync(__dirname + `/../${pathname}/.env`, variable + "\n")
    );
  }
};

buildEnv();
