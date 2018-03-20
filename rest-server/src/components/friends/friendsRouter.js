import express from "express";
import { addFriendController, fetchFriendController, delFriendController, updateFriendController } from "./friendsControllers";

const router = express.Router();

router.route("/add")
  .post(addFriendController);

router.route("/fetchFriends/:u_id/")
  .get(fetchFriendController);

router.route("/deleteFriend/:u_id/:f_id")
  .delete(delFriendController);

router.route("/:u_id/:f_id/:status")
  .put(updateFriendController);

export default router;
