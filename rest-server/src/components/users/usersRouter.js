import express from "express";
import validate from "express-validation";

import { userController } from "./usersControllers";
import formValidation from "../../middleware/validation/formValidation";

const router = express.Router();

router.route("/find")
  .post(validate(formValidation.findUser), userController);
  
export default router;

// .post(validate(formValidation.findUser), userController);
// .post(userController);
