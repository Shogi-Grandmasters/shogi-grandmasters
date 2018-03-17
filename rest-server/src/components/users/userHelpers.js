import db from "../../config/database/";
import { success, error } from "../../lib/log";
import {
  fetchUserHelper,
  deleteUserHelper,
  updateUserHelper
} from "./userSQL";

export const fetchUserQuery = async body => {
  try {
    const queryString = fetchUserHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "fetchUserQuery - successfully fetched user data",
      JSON.stringify(rows)
    );
    return rows;
  } catch (err) {
    error("fetchUserQuery - error= ", err);
    throw new Error(err);
  }
};

export const deleteUserQuery = async body => {
  try {
    const queryString = deleteUserHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "deleteUserQuery - successfully deleted user data",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("deleteUserQuery - error= ", err);
    throw new Error(err);
  }
};

export const updateUserQuery = async body => {
  try {
    const queryString = updateUserHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "updateUserQuery - successfully updated user data",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("updateUserQuery - error= ", err);
    throw new Error(err);
  }
};