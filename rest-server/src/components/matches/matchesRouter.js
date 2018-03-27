import express from "express";

import {
  createMatchController,
  fetchMatchController,
  updateMatchController,
  endMatchController
} from "./matchesControllers";

const router = express.Router();

router
  .route("/")
  .post(createMatchController)
  .get(fetchMatchController)
  .put(updateMatchController);

router
  .route("/end")
  .post(endMatchController);

export default router;
