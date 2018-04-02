import {db} from "../index";
import { success, error } from "../../../lib/log";

export const createModifiedDateFunction = async () => {
  try {
    await db.queryAsync(
      `
      CREATE OR REPLACE FUNCTION update_modified()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.modified = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
      `
    );
    success("successfully created 'modified' field auto-updater function");
  }
  catch (err) {
    error('error creating modified field function, e = ', err);
  }
};

export const createModifiedDateTrigger = async (table) => {
  try {
    await db.queryAsync(
      `
      CREATE TRIGGER update_${table}_modified
      BEFORE UPDATE ON ${table}
      FOR EACH ROW EXECUTE PROCEDURE update_modified();
      `
    )
  }
  catch (err) {
    error(`error adding modified date trigger to table: ${table}, e = `, err);
  }
}

// Match Status Values
// 0 - Open
// 1 - Ended, Checkmate
// 2 - Ended, Conceded
// 3 - Ended, Impasse (TBD)

// Match Types
// 0 - Unranked
// 1 - Ranked
// 2 - Friendly (TBD)

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
        event_log JSON,
        type INT DEFAULT 0,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE DEFAULT now(),
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
