import express from "express";
import validate from "express-validation";
import passport from "passport";

import { signUpController, loginController } from "../controllers/authControllers";
import formValidation from "../middleware/validation/formValidation";
import "../middleware/validation/passport";

const router = express.Router();

router.route("/signup").post(validate(formValidation.signUp), signUpController);

router
  .route("/login")
  .post(
    validate(formValidation.login),
    passport.authenticate("local", { session: false }),
    loginController
  );

export default router;
