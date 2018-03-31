import express from "express";

import {
  createMatchController,
  fetchMatchController,
  updateMatchController,
  endMatchController,
  historyMatchController
} from "./matchesControllers";

const router = express.Router();

router
  .route("/history")
  .get(historyMatchController);

router
  .route("/")
  .post(createMatchController)
  .get(fetchMatchController)
  .put(updateMatchController);

router
  .route("/end")
  .post(endMatchController);

export default router;
