import redis from "redis";

import { db, redisCache } from "../../config/database/";
import { success, error } from "../../lib/log";
import {
  fetchLeaderboardHelper,
  fetchUserLeaderboardHelper,
  addUserLeaderboardHelper,
  updateLeaderboardHelper,
  fetchLeaderboardFromRatingHelper
} from "./leaderboardSQL";

export const fetchLeaderboardQuery = async () => {
  try {
    const unrankedLeaderboard = await redisCache.getAsync('unrankedLeaderboard');
    const rankedLeaderboard = await redisCache.getAsync('rankedLeaderboard');
    success(
      "fetchLeaderboardQuery - successfully retrieved leaderboards ",
      );
    return { unrankedLeaderboard, rankedLeaderboard };
  } catch (err) {
    error("fetchLeaderboardQuery - error= ", err);
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

export const fetchLeaderboardFromRatingQuery = async body => {
  try {
    const queryString = fetchLeaderboardFromRatingHelper(body);
    const { rows } = await db.queryAsync(queryString);
    success(
      "fetchLeaderboardFromRatingQuery - successfully retrieved data ",
      JSON.stringify(data.rows)
    );
    return rows;
  } catch (err) {
    error("fetchLeaderboardFromRatingQuery - error= ", err);
    throw new Error(err);
  }
};
