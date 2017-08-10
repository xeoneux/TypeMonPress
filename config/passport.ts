import passport = require("passport");
import passportLocal = require("passport-local");

import { userModel } from "../models";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => done(undefined, user.id));
passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    if (user) done(err, user);
    else done(new Error("User Not Found"));
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    userModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) return done(err);

      if (!user)
        return done(undefined, false, {
          message: `Email ${email} not found.`
        });

      if (user.password === password) return done(undefined, user);
      else
        return done(undefined, false, {
          message: "Invalid email or password."
        });
    });
  })
);
