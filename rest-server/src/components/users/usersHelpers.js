import db from "../../config/database/";
import { success, error } from "../../lib/log";
import { findUsernameHelper } from './usersSQL';

export const usersQuery = async body => {
  try {
    const queryString = findUsernameHelper(body);
    const data = await db.queryAsync(queryString);
    success("usersQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("usersQuery - error= ", err);
    throw new Error(err);
  }
};