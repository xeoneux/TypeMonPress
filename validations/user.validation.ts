import { NextFunction, Request, Response } from "express";

import { validator } from "../helpers/validator";

class UserValidation {
  public index = validator({
    limit: {
      in: "query",
      isInt: {
        errorMessage: "Please Provide An Integer Value Less Than 50",
        options: [{ max: 50 }]
      },
      optional: true
    },
    skip: { in: "query", isInt: true, optional: true }
  });

  public create = validator({
    email: {
      in: "body",
      isEmail: {
        errorMessage: "Invalid Email Address"
      },
      notEmpty: true
    },
    name: {
      in: "body",
      isLength: {
        errorMessage: "Must Be Between 2 & 20 Characters Long!",
        options: [{ min: 2, max: 10 }]
      },
      notEmpty: true
    },
    password: { in: "body", notEmpty: true }
  });

  public show = validator({
    id: {
      in: "params",
      notEmpty: true,
      isMongoId: true,
      errorMessage: "Please provide a valid ID"
    }
  });

  public update = validator({
    id: {
      in: "params",
      notEmpty: true,
      isMongoId: true,
      errorMessage: "Please provide a valid ID"
    }
  });

  public destroy = validator({
    id: {
      in: "params",
      notEmpty: true,
      isMongoId: true,
      errorMessage: "Please provide a valid ID"
    }
  });
}

export const userValidation = new UserValidation();
