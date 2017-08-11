import { Router } from "express";
import { userController } from "../controllers";
import { userValidation } from "../validations";

const router = Router();

router
  .route("/")
  /**
   * @api {get} /users Index All Users
   * @apiName Index
   * @apiGroup User
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  .get(userValidation.index, userController.index)
  /**
   * @api {post} /users Create New User
   * @apiName Create
   * @apiGroup User
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  .post(userValidation.create, userController.create);

router
  .route("/:id")
  /**
   * @api {get} /users/:id Show User Info
   * @apiName Show
   * @apiGroup User
   *
   * @apiParam {Number} id User's Unique Object ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  .get(userValidation.show, userController.show)
  /**
   * @api {put} /users/:id Update User Info
   * @apiName Update
   * @apiGroup User
   *
   * @apiParam {Number} id User's Unique Object ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  .put(userValidation.update, userController.update)
  /**
   * @api {delete} /users/:id Delete User
   * @apiName Delete
   * @apiGroup User
   *
   * @apiParam {Number} id User's Unique Object ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   */
  .delete(userValidation.destroy, userController.destroy);

export default router;
