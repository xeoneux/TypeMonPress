import { Router } from "express"
import { userController } from "../controllers"
import { userValidation } from "../validations"

const router = Router()

router.route("/").get(userValidation.index, userController.index)
router.route("/").post(userValidation.create, userController.create)
router.route("/:id").get(userValidation.userInfo, userController.userInfo)

export default router
