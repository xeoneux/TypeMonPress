import * as Joi from "Joi"

class UserValidation {
    public userInfo = {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
        },
    }
}

export const userValidation = new UserValidation()
