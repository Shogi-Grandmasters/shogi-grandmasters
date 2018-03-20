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

router
  .route("/")
  .post(validate(formValidation.findUser), findUserController)
  .get(fetchUserController)
  .delete(deleteUserController)
  .put(updateUserController);

export default router;
