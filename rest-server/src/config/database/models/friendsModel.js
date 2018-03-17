import db from "../index";
import { success, error } from "../../../lib/log";

export const createFriendsTable = async () => {
  try {
    await db.queryAsync(
      `
      CREATE TABLE IF NOT EXISTS friends
      (
        u_id INT NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
        f_id INT NOT NULL,
        status INT NOT NULL,
=======
        f_id INT NOT NULL
        status INT NOT NULL,
        CONSTRAINT friends_pk
          PRIMARY KEY(id),
>>>>>>> [acct] Working on friends model
=======
        f_id INT NOT NULL,
        status INT NOT NULL,
>>>>>>> [acct] Reset tables and made friends model
        CONSTRAINT fk_friends_u_id
          FOREIGN KEY(u_id) REFERENCES users(id),
        CONSTRAINT fk_friends_f_id
          FOREIGN KEY(f_id) REFERENCES users(id)
      )
      `
    );
    success("successfully created friends table");
  } catch (err) {
    error("error creating friends table ", err);
  }
};

export const dropFriendsTable = async () => {
  try {
    await db.queryAsync(`DROP TABLE IF EXISTS friends`);
    success("successfully dropped friends table");
  } catch (err) {
    error("error dropping friends table ", err);
  }
};
