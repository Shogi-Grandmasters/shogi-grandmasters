import db from "../index";
import { success, error } from "../../../lib/log";

export const createMatchesTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS matches
      (
        id TEXT NOT NULL,
        board JSON NOT NULL,
        status INT DEFAULT 0,
        turn INT DEFAULT 0,
        black INT NOT NULL,
        white INT NOT NULL,
        hand_black JSON NOT NULL,
        hand_white JSON NOT NULL,
        winner INT,
        CONSTRAINT matches_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_matches_black
          FOREIGN KEY(black) REFERENCES users(id),
        CONSTRAINT fk_matches_white
          FOREIGN KEY(white) REFERENCES users(id),
        CONSTRAINT fk_matches_winner
          FOREIGN KEY(winner) REFERENCES users(id)
      )
      `
    );
    success("successfully created matches table");
  } catch (err) {
    error("error creating matches table ", err);
  }
};

export const dropMatchesTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS matches`);
    success("successfully dropped matches table");
  } catch (err) {
    error("error dropping matches table ", err);
  }
};
