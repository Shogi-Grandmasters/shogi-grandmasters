import db from "../index";
import { success, error } from "../../../lib/log";

export const createMessagesTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS messages
      (
        id SERIAL,
        user_id INT NOT NULL,
        match_id TEXT NOT NULL,
        content TEXT NOt NULL,
        CONSTRAINT messages_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_messages_user_id
          FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT fk_messages_match_id
          FOREIGN KEY(match_id) REFERENCES matches(id)
      )
      `
    );
    success("successfully created messages table");
  } catch (err) {
    error("error creating messages table ", err);
  }
};

export const dropMessagesTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS messages`);
    success("successfully dropped messages table");
  } catch (err) {
    error("error dropping messages table ", err);
  }
};
