import passport = require("passport");
import passportLocal = require("passport-local");
import passportFacebook = require("passport-facebook");

import { IUser, userModel } from "../src/models";

import { NextFunction, Request, Response } from "express";

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<IUser, String>((user, done) => done(undefined, user.id));
passport.deserializeUser<IUser, String>((id, done) => {
  userModel.findById(id, (err, user) => {
    if (err) done(err);
    if (user) done(err, user);
    done(new Error("User Not Found"));
  });
});

/**
 * Sign in using Email and Password.
 */
const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    userModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) return done(err);

      if (!user)
        return done(undefined, false, {
          message: `Email ${email} not found.`
        });

      if (user.password === password) return done(undefined, user);
      else {
        return done(undefined, false, {
          message: "Invalid email or password."
        });
      }
    });
  }
);

/**
 * Sign in with Facebook.
 */
const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_ID || 'examplefacebookid',
    clientSecret: process.env.FACEBOOK_SECRET || 'examplefacebooksecret',
    callbackURL: "/auth/facebook/callback",
    profileFields: ["name", "email", "link", "locale", "timezone"],
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      userModel.findOne({ facebook: profile.id }, (err, existingUser) => {
        if (err) return done(err);

        if (existingUser) {
          return done(
            new Error(
              "There already is a Facebook account that belongs to you."
            )
          );
        } else {
          userModel.findById(req.user.id, (err, user) => {
            if (err) return done(err);

            if (user) {
              user.facebook = profile.id;
              user.tokens.push({ kind: "facebook", accessToken });
              user.profile.name = profile.name
                ? user.profile.name ||
                  `${profile.name.givenName} ${profile.name.familyName}`
                : user.profile.name || "";
              user.profile.gender = user.profile.gender || profile._json.gender;
              user.profile.picture =
                user.profile.picture ||
                `https://graph.facebook.com/${profile.id}/picture?type=large`;
              user.save(err => done(err, user));
            }
          });
        }
      });
    } else {
      userModel.findOne({ facebook: profile.id }, (err, existingUser) => {
        if (err) return done(err);

        if (existingUser) return done(undefined, existingUser);

        userModel.findOne(
          { email: profile._json.email },
          (err, existingEmailUser) => {
            if (err) return done(err);

            if (existingEmailUser) {
              return done(
                new Error(
                  "There is already an account using this email address."
                )
              );
            } else {
              const user: any = new userModel();
              user.email = profile._json.email;
              user.facebook = profile.id;
              user.tokens.push({ kind: "facebook", accessToken });
              user.profile.name = profile.name
                ? `${profile.name.givenName} ${profile.name.familyName}`
                : "";
              user.profile.gender = profile._json.gender;
              user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
              user.profile.location = profile._json.location
                ? profile._json.location.name
                : "";
              user.save((err: Error) => done(err, user));
            }
          }
        );
      });
    }
  }
);

passport.use(localStrategy);
passport.use(facebookStrategy);
