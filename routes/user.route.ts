import { Router } from "express"
import { userController } from "../controllers"
import { userValidation } from "../validations"

const router = Router()

router.route("/:id")
    .get(userValidation.userInfo, userController.userInfo)

export default router
