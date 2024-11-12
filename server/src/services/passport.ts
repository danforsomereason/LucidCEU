import passport from "passport";
import passportjwt from "passport-jwt";
import passportlocal from "passport-local";
import mongoose from "mongoose";
import User from "../models/User";

const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;
const LocalStrategy = passportlocal.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "lucid",
};

passport.use(
    new JwtStrategy(jwtOptions, async function (payload: any, done: any) {
        try {
            User.findOne({ _id: payload.id, dt_deleted: null }).then(
                (user: any) => {
                    if (user) return done(null, user);
                    else return done(null, false);
                }
            );
        } catch (err) {
            return done(err, false);
        }
    })
);

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        User.findOne({ email: username, dt_deleted: null }).then(
          (user: any) => {
            if (!user) {
              return done(null, false);
            }
            if (!user.validatePassword(password)) {
              return done(null, false);
            }
            return done(null, user);
          }
        );
      }
    )
  );

export default passport;