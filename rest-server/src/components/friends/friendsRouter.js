import express from "express";
import { friendController } from "./friendsControllers";

const router = express.Router();

router.route("/add")
  .post(friendController);

export default router;
