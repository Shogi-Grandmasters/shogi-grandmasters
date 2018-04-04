import {db} from "../index";
import { success, error } from "../../../lib/log";

export const createUsersTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      wins INT DEFAULT 0,
      losses INT DEFAULT 0,
      rating_unranked INT DEFAULT 1000,
      rating_ranked INT DEFAULT 1000,
      avatar TEXT,
      CONSTRAINT users_pk
        PRIMARY KEY(id)
      )
      `
    );
    success("successfully created users table");
  } catch (err) {
    error("error creating users table ", err);
  }
};

export const dropUsersTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS users`);
    success("successfully dropped users table");
  } catch (err) {
    error("error dropping users table ", err);
  }
};
