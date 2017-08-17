import { NextFunction, Request, Response } from "express";

import { validator } from "../../config/validator";

class AuthValidation {
  public login = validator({
    username: { in: "body", notEmpty: true, errorMessage: "Empty Username" },
    password: { in: "body", notEmpty: true, errorMessage: "Empty Password" }
  });
}

export const authValidation = new AuthValidation();
