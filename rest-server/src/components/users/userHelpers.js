import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import {
  findUserHelper,
  fetchUserHelper,
  deleteUserHelper,
  updateUserHelper,
  updateUserAviHelper
} from "./userSQL";

export const findUserQuery = async body => {
  try {
    const queryString = findUserHelper(body);
    const data = await db.queryAsync(queryString);
    success(
      "findUserQuery - successfully retrieved data ",
      JSON.stringify(data.rows[0])
    );
    return data;
  } catch (err) {
    error("findUserQuery - error= ", err);
    throw new Error(err);
  }
};

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

export const updateUserAviQuery = async body => {
  try {
    const queryString = updateUserAviHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "updateUserAviQuery - successfully updated user data",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("updateUserAviQuery - error= ", err);
    throw new Error(err);
  }
};
