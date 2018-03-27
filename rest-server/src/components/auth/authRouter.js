import express from "express";
import validate from "express-validation";
import passport from "passport";

import { signUpController, loginController, resetPasswordController } from "./authControllers";
import formValidation from "../../middleware/validation/formValidation";
import "../../middleware/validation/passport";

const router = express.Router();

router
  .route("/signup")
  .post(
    validate(formValidation.signUp), 
    signUpController
  );

router
  .route("/reset")
  .put(
    validate(formValidation.reset),
    passport.authenticate("local", { session: false }), 
    resetPasswordController
  );

router
  .route("/login")
  .post(
    validate(formValidation.login),
    passport.authenticate("local", { session: false }),
    loginController
  );

export default router;
