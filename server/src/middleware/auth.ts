import passport from "../services/passport";

export default {
  requireAuth: passport.authenticate("jwt", { session: false }),
  localLogin: passport.authenticate("local", { session: false }),
};