import { success, error } from "../../../lib/log";

const { db } = require("../index");
const Sequelize = require('sequelize');


const Users = db.define("users", {
  email: { type: Sequelize.STRING, unique: true },
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING
  }, { 
  timestamps: false
});

module.exports = Users;
