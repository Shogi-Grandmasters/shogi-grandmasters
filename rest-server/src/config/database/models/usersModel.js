import { success, error } from "../../../lib/log";

const { db, Sequelize } = require("../index");

const Users = db.define("users", {
  email: { type: Sequelize.STRING, unique: true },
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING
});

module.exports = Users;
