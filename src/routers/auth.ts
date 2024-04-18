import {Router} from "express";
import {
    loginUserController, registerEmailResendingController,
    registrationConfirmationController, registrationUserController,
    userCheck
} from "../controllers/authController";
import {inputAuthValidation} from "../validation/auth";
import {checkJWT} from "../middlewares/checkJWT";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {inputUserValidation} from "../validation/users";
import {confirmUserValidation, resendEmailValidation} from "../validation/confirmUser";

export const authRouter = Router()

authRouter.post('/login', inputAuthValidation, inputCheckErrorsMiddleware, loginUserController)
authRouter.get('/me', checkJWT, userCheck)
authRouter.post('/registration-confirmation', confirmUserValidation, inputCheckErrorsMiddleware, registrationConfirmationController)
authRouter.post('/registration', ...inputUserValidation, inputCheckErrorsMiddleware, registrationUserController)
authRouter.post('/registration-email-resending', resendEmailValidation, inputCheckErrorsMiddleware, registerEmailResendingController)
