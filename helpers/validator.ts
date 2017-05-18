import { NextFunction, Request, Response } from "express"
import "express-validator"
import * as util from "util"

export function validator(schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        req.check(schema)

        const result = await req.getValidationResult()

        if (!result.isEmpty()) {
            res.status(400).send("There have been validation errors: " + util.inspect(result.array()))
            return next(result)
        }

        return next()
    }
}
