import db from "../../config/database/";
import { success, error } from "../../lib/log";
import { createMatchHelper, updateMatchHelper } from "./matchesSQL";

export const createMatchQuery = async body => {
  try {
    const queryString = createMatchHelper(body);
    const data = await db.query(queryString);
    success(
      "createMatchQuery - successfully saved match",
      JSON.stringify(data[0])
    );
    return data;
  } catch (err) {
    error("createMatchpQuery - error= ", err);
    throw new Error(err);
  }
};

export const updateMatchQuery = async body => {
  try {
    const queryString = updateMatchHelper(body);
    const data = await db.query(queryString);
    success(
      "updateMatchQuery - successfully updated match",
      JSON.stringify(data[0])
    );
    return data[0];
  } catch (err) {
    error("updateMatchQuery - error= ", err);
    throw new Error(err);
  }
};
