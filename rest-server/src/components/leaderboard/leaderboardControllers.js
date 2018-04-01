import {
  fetchLeaderboardQuery,
  fetchUserLeaderboardQuery,
  addUserLeaderboardQuery,
  updateLeaderboardQuery,
  fetchLeaderboardFromRating
} from "./leaderboardHelpers";
import { success, error } from "../../lib/log";

export const fetchLeaderboardController = async (req, res) => {
  try {
    const data = await fetchLeaderboardQuery();
    success(
      `fetchLeaderboardController - sucessfully retrieved leaderboard`
    );
    return res.status(200).send(data);
  } catch (err) {
    error(`fetchLeaderboardController - error= ${err}`);
    return res.status(400).send(err);
  }
};

export const fetchUserLeaderboardController = async (req, res) => {
  try {
    const data = await fetchUserLeaderboardQuery(req.params);
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

export const fetchLeaderboardFromRatingController = async (req, res) => {
  try {
    const data = await fetchLeaderboardFromRatingQuery(req.params);
    success(
      `fetchLeaderboardFromRatingController - sucessfully retrieved data ${JSON.stringify(
        data.rows
      )}`
    );
    return res.status(200).send(data.rows);
  } catch (err) {
    error(`fetchLeaderboardFromRatingController - error= ${err}`);
    return res.status(400).send(err);
  }
};
