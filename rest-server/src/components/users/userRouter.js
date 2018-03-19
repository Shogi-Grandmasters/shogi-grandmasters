import express from "express";

import {
  fetchUserController,
  deleteUserController,
  updateUserController
} from "./userControllers";

const router = express.Router();

router
  .route("/")
  .get(fetchUserController)
  .delete(deleteUserController)
  .put(updateUserController);

export default router;
