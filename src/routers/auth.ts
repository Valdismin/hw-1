import {Router} from "express";
import {loginUserController} from "../controllers/authController";
import {inputAuthValidation} from "../validation/auth";

export const authRouter = Router()

authRouter.post('/login', inputAuthValidation, loginUserController)
