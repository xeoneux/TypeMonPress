import { NextFunction, Request, Response } from "express"

import { validator } from "../helpers/validator"

class UserValidation {
    public userInfo = validator({
        id: {
            in: "params",
            notEmpty: true,
        },
    })
}

export const userValidation = new UserValidation()
