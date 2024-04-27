import {Router} from "express";
import {inputUserValidation} from "../validation/users";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {createUserController, deleteUserController, getUsersController} from "../controllers/usersController";
import {authMiddleware} from "../middlewares/auth";
import {updateSession} from "../middlewares/updateSession";

export const usersRouter = Router()

usersRouter.get('/', updateSession, getUsersController)

usersRouter.post('/', [authMiddleware, ...inputUserValidation], inputCheckErrorsMiddleware, updateSession, createUserController)

usersRouter.delete('/:id', authMiddleware, updateSession, deleteUserController)
