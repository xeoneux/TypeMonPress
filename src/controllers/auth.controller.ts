import { NextFunction, Request, Response } from "express";
import { IUser } from "../models";

import { NOT_FOUND, OK } from "http-status-codes";
import { userModel } from "../models";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    // Ideally this will be fetched from the database.
    if (
      req.body.username === "typemonpress" &&
      req.body.password === "typemonpress"
    ) {
      res.status(OK).send();
    } else {
      res.status(NOT_FOUND).send();
    }
  }

  public async random(req: Request, res: Response, next: NextFunction) {
    return res.json({
      user: req.user,
      num: Math.random() * 100
    });
  }
}

export const authController = new AuthController();
