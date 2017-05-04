import { Router } from "express"
import { userController } from "../controllers"

const router = Router()

router.route("/:id")
    .get(userController.infoUser)

export default router
