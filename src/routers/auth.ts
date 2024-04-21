import {Router} from "express";
import {
    loginUserController, logoutUserController, registerEmailResendingController,
    registrationConfirmationController, registrationUserController, updateTokenController,
    userCheck
} from "../controllers/authController";
import {inputAuthValidation} from "../validation/auth";
import {checkJWT} from "../middlewares/checkJWT";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {inputUserValidation} from "../validation/users";
import {confirmUserValidation, resendEmailValidation} from "../validation/confirmUser";
import {checkRefreshToken} from "../middlewares/checkRefreshToken";

export const authRouter = Router()

authRouter.post('/login', inputAuthValidation, inputCheckErrorsMiddleware, loginUserController)
authRouter.post('/refresh-token', checkRefreshToken, updateTokenController)
authRouter.post('/logout', checkRefreshToken, logoutUserController)
authRouter.get('/me', checkJWT, userCheck)
authRouter.post('/registration-confirmation', confirmUserValidation, inputCheckErrorsMiddleware, registrationConfirmationController)
authRouter.post('/registration', ...inputUserValidation, inputCheckErrorsMiddleware, registrationUserController)
authRouter.post('/registration-email-resending', resendEmailValidation, inputCheckErrorsMiddleware, registerEmailResendingController)
