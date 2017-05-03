import { Router } from "express"
import userRoute from "./user.route"

const router = Router()

router.use("/users", userRoute)

export default router
