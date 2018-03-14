import * as chalk from "chalk";

export const success = (...log) => {
  if (process.env.DEBUG === "TRUE") {
    console.log(chalk.default.white.bgGreen.bold(...log));
  }
};

export const warning = (...log) => {
  if (process.env.DEBUG === "TRUE") {
    console.log(chalk.default.white.bgYellow.bold(...log));
  }
};

export const error = (...log) => {
  if (process.env.DEBUG === "TRUE") {
    console.log(chalk.default.white.bgRed.bold(...log));
  }
};

export const log = (...log) => {
  if (process.env.DEBUG === "TRUE") {
    console.log(chalk.default.white.bgWhite.bold(...log));
  }
};
