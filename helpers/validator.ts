import { NextFunction, Request, Response } from "express";
import { inspect } from "util";

export function validator(schema: object) {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.check(schema);

    const result = await req.getValidationResult();

    if (!result.isEmpty()) {
      res
        .status(400)
        .send("There have been validation errors: " + inspect(result.array()));
      return next(result);
    }

    return next();
  };
}
