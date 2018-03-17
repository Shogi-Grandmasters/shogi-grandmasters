import express from "express";

import {
  createMatchController,
  fetchMatchController,
  updateMatchController
} from "./matchesControllers";

const router = express.Router();

router
  .route("/")
  .post(createMatchController)
  .get(fetchMatchController)
  .put(updateMatchController);

export default router;
