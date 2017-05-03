import { Request, Response } from "express"
import { IUser } from "../models"

import { notFound } from "Boom"
import { userModel } from "../models"

class UserController {

    public async infoUser(req: Request, res: Response) {
        const id = req.body.id

        const user = await userModel.findById(id)
        user ? res.json(user) : res.json(notFound())
    }
}

export const userController = new UserController()
