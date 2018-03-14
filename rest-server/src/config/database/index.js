require("dotenv").config();

import Promise from "bluebird";

import { success, error } from "../../lib/log";

const Sequelize = require("sequelize");

const config = {
  user:
    process.env.NODE_ENV === "production"
      ? process.env.AWS_USER
      : process.env.LOCAL_USER,
  host:
    process.env.NODE_ENV === "production"
      ? process.env.AWS_HOST
      : process.env.LOCAL_HOST,
  database:
    process.env.NODE_ENV === "production"
      ? process.env.AWS_DATABASE
      : process.env.LOCAL_DATABASE,
  password:
    process.env.NODE_ENV === "production"
      ? process.env.AWS_PASSWORD
      : process.env.LOCAL_PASSWORD,
  port:
    process.env.NODE_ENV === "production"
      ? process.env.AWS_PORT
      : process.env.LOCAL_PORT,
};

const db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: "postgres",
  protocol: "postgres",
  logging: false,

  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db
  .authenticate()
  .then(() => success("grandmaster database connected"))
  .catch(err => error("Error: ", err));

Promise.promisifyAll(db);
Promise.promisifyAll(Sequelize);

module.exports = { db, Sequelize };
