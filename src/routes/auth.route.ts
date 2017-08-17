import { Router } from "express";
import { authController } from "../controllers";
import { authValidation } from "../validations";

const router = Router();

router
  .route("/login")
  /**
   * @api {post} /login Login as user
   * @apiName Login
   * @apiGroup Auth
   * 
   * @apiParam {String} username User's username.
   * @apiParam {String} password User's password.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */

  .post(authValidation.login, authController.login);

export default router;
