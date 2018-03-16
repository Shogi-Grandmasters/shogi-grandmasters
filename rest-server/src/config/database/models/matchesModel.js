import db from "../index";
import { success, error } from "../../../lib/log";

export const createMatchesTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS matches
      (
        id SERIAL,
        board JSON NOT NULL,
        outcome INT NOT NULL,
        turn INT NOT NULL,
        hand_white JSON NOT NULL,
        hand_black JSON NOT NULL,
        player1 INT NOT NULL,
        player2 INT NOT NULL,
        CONSTRAINT matches_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_matches_player1
          FOREIGN KEY(player1) REFERENCES users(id),
        CONSTRAINT fk_matches_player2
          FOREIGN KEY(player2) REFERENCES users(id)
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
