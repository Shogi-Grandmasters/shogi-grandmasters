import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import { createOpenMatchHelper, fetchOpenMatchHelper, deleteOpenMatchHelper } from "./openMatchesSQL";

export const createOpenMatchQuery = async body => {
  try {
    const queryString = createOpenMatchHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "createOpenMatchQuery - successfully saved open match",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("createOpenMatchQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchOpenMatchQuery = async (query) => {
  try {
    const queryString = fetchOpenMatchHelper(query);
    const { rows } = await db.query(queryString);
    success(
      "fetchOpenMatchQuery - successfully fetched open match",
      JSON.stringify(rows)
    );
    return rows;
  } catch (err) {
    error("fetchOpenMatchQuery - error= ", err);
    throw new Error(err);
  }
};

export const deleteOpenMatchQuery = async (body) => {
  try {
    const queryString = deleteOpenMatchHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "deleteOpenMatchQuery - successfully deleted open match",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("deleteOpenMatchQuery - error= ", err);
    throw new Error(err);
  }
};
