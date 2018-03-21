import express from "express";

import {
  fetchLeaderboardController,
  fetchUserLeaderboardController,
  addUserLeaderboardController,
  updateLeaderboardController,
  fetchLeaderboardFromRatingController
} from "./leaderboardControllers";

const router = express.Router();

router
  .route("/user/:userId")
    .get(fetchUserLeaderboardController);

router
  .route("/rating/:rating")
    .get(fetchLeaderboardFromRatingController);

router
  .route("/")
  .get(fetchLeaderboardController)
  .post(addUserLeaderboardController)
  .put(updateLeaderboardController);

export default router;
