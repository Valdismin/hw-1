import {Router} from "express";
import {loginUserController, userCheck} from "../controllers/authController";
import {inputAuthValidation} from "../validation/auth";
import {checkJWT} from "../middlewares/checkJWT";

export const authRouter = Router()

authRouter.post('/login', inputAuthValidation, loginUserController)
authRouter.get('/me', checkJWT, userCheck)
