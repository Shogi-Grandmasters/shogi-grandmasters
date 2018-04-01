import { signUpQuery, loginQuery, resetPasswordQuery } from "./authHelpers";
import { success, error } from "../../lib/log";
import { generateToken } from "../../middleware/auth/jwt";
import { hashPassword } from "../../middleware/auth/bcrypt";

export const signUpController = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const data = await signUpQuery(req.body);
    const { id, username } = data.rows[0];
    success(
      "signUpController - successfully retrieved data ",
      JSON.stringify(data.rows[0])
    );
    const token = await generateToken(id, username);
    data.rows[0].token = token;
    return res
      .status(200)
      .append("authorization", JSON.stringify(token))
      .send(data.rows[0]);
  } catch (err) {
    error("signUpController - error= ", err);
    res.status(404).send(err);
  }
};

export const loginController = async (req, res) => {
  try {
    const data = await loginQuery(req.body);
    delete data.rows[0].password;
    const { id, username } = data.rows[0];
    success(
      "loginController - successfully retrieved data ",
      JSON.stringify(data.rows[0])
    );
    const token = await generateToken(id, username);
    data.rows[0].token = token;
    return res
      .status(200)
      .append("authorization", JSON.stringify(token))
      .send(data.rows[0]);
  } catch (err) {
    error("loginController - error= ", err);
    res.status(404).send(err);
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    req.body.new_password = await hashPassword(req.body.new_password);
    const login = await loginQuery(req.body);
    const data = await resetPasswordQuery(req.body);
    const token = await generateToken(data.rows[0].id, data.rows[0].username);
    data.rows[0].token = token;
    success("resetPasswordController - sucessfully retrieved data ", JSON.stringify(data.rows[0]));
    return res.status(200).send(data.rows);
  } catch (err) {
    error("resetPasswordController - error= ", err);
    return res.status(400).send(err);
  }
};
