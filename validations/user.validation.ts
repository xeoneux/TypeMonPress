import { NextFunction, Request, Response } from "express"

import { validator } from "../helpers/validator"

class UserValidation {
    public index = validator({
        limit: {
            in: "query",
            isInt: {
                errorMessage: "Please Provide An Integer Value Less Than 50",
                options: [{ max: 50 }],
            },
            optional: true,
        },
        skip: {
            in: "query",
            isInt: true,
            optional: true,
        },
    })

    public userInfo = validator({
        id: {
            in: "params",
            notEmpty: true,
        },
    })
}

export const userValidation = new UserValidation()
