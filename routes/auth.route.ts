import { Router } from "express";
import { authController } from "../controllers";
import { authValidation } from "../validations";

const router = Router();

router.route("/login").post(authValidation.login, authController.login);

export default router;
