import db from "../../config/database/";
import { success, error } from "../../lib/log";
import { createMatchHelper, fetchMatchHelper, updateMatchHelper } from "./matchesSQL";

export const createMatchQuery = async body => {
  try {
    const queryString = createMatchHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "createMatchQuery - successfully saved match",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("createMatchpQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchMatchQuery = async query => {
  try {
    const queryString = fetchMatchHelper(query);
    const { rows } = await db.queryAsync(queryString);
    success("fetchMatchQuery - successfully fetched open match ", rows);
    return rows;
  } catch (err) {
    error("fetchMatchQuery - error=", err);
  }
};

export const updateMatchQuery = async body => {
  try {
    const queryString = updateMatchHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "updateMatchQuery - successfully updated match",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("updateMatchQuery - error= ", err);
    throw new Error(err);
  }
};
