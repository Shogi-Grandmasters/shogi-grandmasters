import express from "express";

import {
  createMatchController,
  updateMatchController
} from "./matchesControllers";

const router = express.Router();

router
  .route("/")
  .post(createMatchController)
  .put(updateMatchController);

export default router;
