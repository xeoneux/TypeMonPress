import { Router } from "express"
import { userInfo } from "../controllers"

const router = Router()

router.route("/:id")
    .get(userInfo)

export default router
