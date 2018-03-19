import express from "express";

import {
  createMessageController,
  fetchMessageController,
  // deleteMessageController
} from "./messagesControllers";

const router = express.Router();

router
  .route("/")
  .post(createMessageController)
  .get(fetchMessageController);
  // .delete(deleteMessageController);

export default router;
