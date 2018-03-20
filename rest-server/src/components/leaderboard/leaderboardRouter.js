import express from "express";

import {
  fetchLeaderboardController,
  fetchUserLeaderboardController,
  addUserLeaderboardController,
  updateLeaderboardController
} from "./leaderboardControllers";

const router = express.Router();

router
  .route("/")
  .get(fetchLeaderboardController)
  .get(fetchUserLeaderboardController)
  .post(addUserLeaderboardController)
  .put(updateLeaderboardController);

export default router;
