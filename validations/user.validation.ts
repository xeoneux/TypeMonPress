import { NextFunction, Request, Response } from "express"

import { validator } from "../helpers/validator"

class UserValidation {
    public userInfo = validator({
        email: {
            in: "query",
            isEmail: { errorMessage: "Invalid Email" },
            notEmpty: true,
        },
    })
}

export const userValidation = new UserValidation()
