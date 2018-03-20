import db from "../../config/database";
import {
  fetchLeaderboardQuery,
  fetchUserLeaderboardQuery,
  addUserLeaderboardQuery,
  updateLeaderboardQuery
} from "./leaderboardHelpers";
import { success, error } from "../../lib/log";

export const fetchLeaderboardController = async (req, res) => {
  try {
    const data = await fetchLeaderboardQuery(req.body);
    success(
      `fetchLeaderboardController - sucessfully retrieved data ${JSON.stringify(
        data.rows
      )}`
    );
    return res.status(200).send(data.rows);
  } catch (err) {
    error(`fetchLeaderboardController - error= ${err}`);
    return res.status(400).send(err);
  }
};

export const fetchUserLeaderboardController = async (req, res) => {
  try {
    const data = await fetchUserLeaderboardQuery(req.body);
    success(
      "fetchUserLeaderBoardController - successfully fetched leaderboard user data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("fetchUserLeaderboardController - error= ", err);
    res.status(404).send(err);
  }
};

export const addUserLeaderboardController = async (req, res) => {
  try {
    const data = await addUserLeaderboardQuery(req.body);
    success(
      "addUserLeaderbordController - successfully added user data to leaderboard",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("addUserLeaderboardController - error= ", err);
    res.status(404).send(err);
  }
};

export const updateLeaderboardController = async (req, res) => {
  try {
    const data = await updateLeaderboardQuery(req.body);
    success(
      "updateLeaderboardController - successfully updated user leaderboard data",
      JSON.stringify(data)
    );
    return res.status(200).send(data);
  } catch (err) {
    error("updateleaderboardController - error= ", err);
    res.status(404).send(err);
  }
};
