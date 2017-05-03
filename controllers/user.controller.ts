import { Request, Response } from "express"
import { IUser } from "../models/user.model"

import { userModel } from "../models/user.model"

class UserController {

    public infoUser(req: Request, res: Response) {
        const id = req.body.id

        userModel.findById(id)
            .then((user: IUser) => {
                res.json(user)
            })
            .catch((error) => {
                res.json(error)
            })
    }
}

export const userController = new UserController()
