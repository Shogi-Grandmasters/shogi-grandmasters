import db from "../index";
import { success, error } from "../../../lib/log";

export const createOpenMatchesTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS open_matches
      (
        id TEXT NOT NULL,
        player1 INT NOT NULL,
        CONSTRAINT open_matches_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_open_matches_player1
          FOREIGN KEY(player1) REFERENCES users(id)
      )
      `
    );
    success("successfully created open_matches table");
  } catch (err) {
    error("error creating open_matches table ", err);
  }
};

export const dropOpenMatchesTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS open_matches`);
    success("successfully dropped open_matches table");
  } catch (err) {
    error("error dropping open_matches table ", err);
  }
};
