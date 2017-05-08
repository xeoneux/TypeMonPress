import { Request, Response } from "express"
import { IUser } from "../models"

import { BAD_REQUEST, NOT_FOUND, OK } from "http-status-codes"
import { userModel } from "../models"

class UserController {
    public async userInfo(req: Request, res: Response) {
        const id = req.params.id
        try {
            const user = await userModel.findById(id)
            user
                ? res.status(OK).json(user)
                : res.status(NOT_FOUND).send()
        } catch (error) {
            res.status(BAD_REQUEST).json(error)
        }
    }
}

export const userController = new UserController()
