import express from "express";

import {
  createOpenMatchController,
  fetchOpenMatchController,
  deleteOpenMatchController
} from "./openMatchesControllers";

const router = express.Router();

router
  .route("/")
  .post(createOpenMatchController)
  .get(fetchOpenMatchController)
  .delete(deleteOpenMatchController);

export default router;
