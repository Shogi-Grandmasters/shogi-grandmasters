import { sign, verify } from "jsonwebtoken";

import { success, error } from "../../lib/log";

export const generateToken = (id, username) => {
  const token = {};

  token.accessToken = sign(
    {
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      username,
      id,
    },
    process.env.TOKEN_SECRET
  );

  return token;
};

export const verifyUserWithJWT = (req, res, next) => {
  try {
    verify(req.headers.authorization.slice(7), process.env.TOKEN_SECRET);
    success("token verified");
    next();
  } catch (e) {
    error("token not verified");
    next(e);
  }
};
