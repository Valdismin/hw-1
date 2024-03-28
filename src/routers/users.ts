import {Router} from "express";
import {inputUserValidation} from "../validation/users";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {createUserController, deleteUserController, getUsersController} from "../controllers/usersController";
import {authMiddleware} from "../middlewares/auth";

export const usersRouter = Router()

usersRouter.get('/', getUsersController)

usersRouter.post('/', [authMiddleware, ...inputUserValidation], inputCheckErrorsMiddleware, createUserController)

usersRouter.delete('/:id', authMiddleware, deleteUserController)
