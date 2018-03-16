import express from "express";

import {
  createOpenMatchController,
  fetchOpenMatchController
} from "./openMatchesControllers";

const router = express.Router();

router
  .route("/")
  .post(createOpenMatchController)
  .get(fetchOpenMatchController);

export default router;
