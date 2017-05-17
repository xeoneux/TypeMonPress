import { Router } from "express"
import * as validate from "express-validation"
import { userController } from "../controllers"
import { userValidation } from "../validations"

const router = Router()

router.route("/:id")
    .get(userValidation.userInfo, userController.userInfo)

export default router
