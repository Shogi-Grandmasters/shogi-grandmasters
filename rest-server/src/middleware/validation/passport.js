import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";

import { loginQuery } from "../../components/auth/authHelpers";
import { comparePasswords } from "../auth/bcrypt";
const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const localOptions = {
  usernameField: "username"
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.TOKEN_SECRET
};

passport.use(
  new LocalStrategy(localOptions, async (username, password, done) => {
    try {
      const user = await loginQuery({ username });
      if (!user.rows.length) {
        return done(null, false, { message: "Incorrect username." });
      }
      const passwordsMatch = await comparePasswords(password, user.rows[0].password);
      if (!passwordsMatch) {
        return done(null, false, { message: "Incorrect password " });
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await loginHelper(jwt_payload.sub);
      if (user.length) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  })
);

export default passport;
