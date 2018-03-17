import express from "express";
import validate from "express-validation";

import { friendController } from "./friendsControllers";
import formValidation from "../../middleware/validation/formValidation";
import "../../middleware/validation/passport";

const router = express.Router();

router.route("/add")
  .post(validate(formValidation.findUser), friendController);

export default router;
