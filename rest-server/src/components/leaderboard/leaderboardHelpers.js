import db from "../../config/database/";
import { success, error } from "../../lib/log";
import {
  fetchLeaderboardHelper,
  fetchUserLeaderboardHelper,
  addUserLeaderboardHelper,
  updateLeaderboardHelper
} from "./leaderboardSQL";

export const fetchLeaderboardQuery = async body => {
  try {
    const queryString = fetchLeaderboardHelper(body);
    const { rows } = await db.queryAsync(queryString);
    success(
      "fetchLeaderboardQuery - successfully retrieved data ",
      JSON.stringify(data.rows)
    );
    return rows;
  } catch (err) {
    error("usersQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchUserLeaderboardQuery = async body => {
  try {
    const queryString = fetchUserLeaderboardHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "fetchUserLeaderboardQuery - successfully fetched user leaderboard data",
      JSON.stringify(rows)
    );
    return rows;
  } catch (err) {
    error("fetchUserLeaderboardQuery - error= ", err);
    throw new Error(err);
  }
};

export const addUserLeaderboardQuery = async body => {
  try {
    const queryString = addUserLeaderboardHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "addUserLeaderboardQuery - successfully added user data to leaderboard",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("addUserLeaderboardQuery - error= ", err);
    throw new Error(err);
  }
};

export const updateLeaderboardQuery = async body => {
  try {
    const queryString = updateLeaderboardHelper(body);
    const { rows } = await db.query(queryString);
    success(
      "updateLeaderboardQuery - successfully updated user leaderboard data",
      JSON.stringify(rows[0])
    );
    return rows[0];
  } catch (err) {
    error("updateLeaderboardQuery - error= ", err);
    throw new Error(err);
  }
};
