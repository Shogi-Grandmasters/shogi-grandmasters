import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import {
  createMessageHelper,
  fetchMessageHelper,
  deleteMessageHelper
} from "./messagesSQL";

export const createMessageQuery = async body => {
  try {
    const queryString = createMessageHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "createMessageQuery - successfully saved message",
      JSON.stringify(rows)
    );
    return rows;
  } catch (err) {
    error("createMessageQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchMessageQuery = async query => {
  try {
    const queryString = fetchMessageHelper(query);
    const { rows } = await db.query(queryString);
    success(
      "fetchMessageQuery - successfully fetched messages",
      JSON.stringify(rows)
    );
    return rows;
  } catch (err) {
    error("fetchMessageQuery - error= ", err);
    throw new Error(err);
  }
};

// export const deleteMessageQuery = async body => {
//   try {
//     const queryString = deleteMessageHelper(body);
//     const { rows } = await db.query(queryString);
//     success(
//       "deleteMessageQuery - successfully deleted message",
//       JSON.stringify(rows[0])
//     );
//     return rows[0];
//   } catch (err) {
//     error("deleteMessageQuery - error= ", err);
//     throw new Error(err);
//   }
// };
