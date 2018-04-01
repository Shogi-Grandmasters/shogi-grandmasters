import { Pool } from "pg";
import Promise from "bluebird";
import redis from "redis";

import { success, error } from "../../lib/log";

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
  max: 20
};

const db = new Pool(config);

db.on("connect", () => {
  success("successfully connected to db", config.database);
});

db.on("error", err => {
  error("error in pg ", err);
});

db.connect();


Promise.promisifyAll(db);
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const redisCache = redis.createClient();
redisCache.on("connect", () => success("redis cache connected"));

export { db, redisCache };
