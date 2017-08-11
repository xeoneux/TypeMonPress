import { NextFunction, Request, Response } from "express";
import { IUser } from "../models";

import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes";
import { userModel } from "../models";

class UserController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const { limit = 50, skip = 0 } = req.query;
    const users = await userModel
      .find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit);

    res.status(OK).json(users);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const user = new userModel({ name, email, password });

    try {
      res.json(await user.save());
    } catch (error) {
      res.status(BAD_REQUEST).send(error);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    return res.json(req.user);
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const user: IUser = req.user;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    try {
      res.json(await user.save());
    } catch (error) {
      res.status(BAD_REQUEST).send(error);
    }
  }

  public async destroy(req: Request, res: Response, next: NextFunction) {
    const user: IUser = req.user;
    user.remove();
    try {
      res.json(await user.remove());
    } catch (error) {
      res.status(BAD_REQUEST).send(error);
    }
  }
}

export const userController = new UserController();
