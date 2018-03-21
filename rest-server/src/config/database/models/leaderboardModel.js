import db from "../index";
import { success, error } from "../../../lib/log";

export const createLeaderboardTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS leaderboard
      (
      id SERIAL,
      user_id INT UNIQUE,
      rating INT
      CONSTRAINT place_pk
        PRIMARY KEY(id)
      CONSTRAINT user_fk
        FORIEGN KEY(user_id)
          REFERENCES users(id)
      CONSTRAINT nomore_than_x_rows
        CHECK( table_id < 20 );
      )
      `
    );
    success("successfully created leaderboard table");
  } catch (err) {
    error("error creating leaderboard table ", err);
  }
};

export const dropUsersTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS leaderboard`);
    success("successfully dropped leaderboard table");
  } catch (err) {
    error("error dropping leaderboard table ", err);
  }
};
