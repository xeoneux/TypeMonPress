import { Router } from "express"
import * as validate from "express-validation"
import { userController } from "../controllers"
import { userValidation } from "../validations"

const router = Router()

router.route("/:id")
    .get(userController.userInfo, validate(userValidation.userInfo))

export default router
