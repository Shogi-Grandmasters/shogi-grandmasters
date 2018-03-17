import db from "../../config/database/";
import { success, error } from "../../lib/log";
import { addFriendHelper } from './friendsSQL';

export const friendsQuery = async body => {
  try {
    const queryString = addFriendHelper(body);
    const data = await db.queryAsync(queryString);
    success("friendsQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("friendsQuery - error= ", err);
    throw new Error(err);
  }
};