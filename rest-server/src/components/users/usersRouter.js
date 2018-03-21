import express from "express";
import validate from "express-validation"

import {
  findUserController,
  fetchUserController,
  deleteUserController,
  updateUserController
} from "./userControllers";
import formValidation from "../../middleware/validation/formValidation";

const router = express.Router();

router.route("/:userId")
  .get(fetchUserController)

router
  .route("/")
  .post(validate(formValidation.findUser), findUserController)
  .delete(deleteUserController)
  .put(updateUserController);



export default router;
