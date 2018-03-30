import express from "express";
import validate from "express-validation"

import {
  findUserController,
  fetchUserController,
  deleteUserController,
  updateUserController,
  updateUserAviController
} from "./userControllers";
import formValidation from "../../middleware/validation/formValidation";

const router = express.Router();

router.route("/:userId")
  .get(fetchUserController)
  
router.route("/:id/:avi/:url")
  .put(updateUserAviController)

router
  .route("/")
  .post(validate(formValidation.findUser), findUserController)
  .get(validate(formValidation.findUser), findUserController)
  .delete(deleteUserController)
  .put(updateUserController);



export default router;
