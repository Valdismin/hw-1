import {Router} from "express";
import {inputUserValidation} from "./usersValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {authMiddleware} from "../../middlewares/auth";
import {updateSession} from "../../middlewares/updateSession";
import {container} from "../../db/ioc";
import {UsersController} from "./usersController";

const usersController = container.get(UsersController)

export const usersRouter = Router()

usersRouter.get('/', updateSession, usersController.getUsers.bind(usersController))

usersRouter.post('/', [authMiddleware, ...inputUserValidation], inputCheckErrorsMiddleware, updateSession, usersController.createUser.bind(usersController))

usersRouter.delete('/:id', authMiddleware, updateSession, usersController.deleteUser.bind(usersController))
