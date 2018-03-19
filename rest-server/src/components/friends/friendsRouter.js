import express from "express";
import { addFriendController, fetchFriendController, delFriendController } from "./friendsControllers";

const router = express.Router();

router.route("/add")
  .post(addFriendController);

router.route("/fetchFriends/:u_id/")
  .get(fetchFriendController);

router.route("/deleteFriend/:u_id/:f_id")
  .delete(delFriendController);

export default router;
