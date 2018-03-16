import db from "../../config/database/";
import { success, error } from "../../lib/log";
import { createOpenMatchHelper, fetchOpenMatchHelper } from "./openMatchesSQL";

export const createOpenMatchQuery = async body => {
  try {
    const queryString = createOpenMatchHelper(body);
    const data = await db.query(queryString);
    success(
      "createOpenMatchQuery - successfully saved open match",
      JSON.stringify(data[0])
    );
    return data;
  } catch (err) {
    error("createOpenMatchQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchOpenMatchQuery = async () => {
  try {
    const queryString = fetchOpenMatchHelper();
    const data = await db.query(queryString);
    success(
      "fetchOpenMatchQuery - successfully fetched open match",
      JSON.stringify(data.rows)
    );
    return data.rows;
  } catch (err) {
    error("fetchOpenMatchQuery - error= ", err);
    throw new Error(err);
  }
};
