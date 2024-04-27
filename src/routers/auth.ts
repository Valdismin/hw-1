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
import {apiUsageMiddleware} from "../middlewares/apiUsage";
import {updateSession} from "../middlewares/updateSession";

export const authRouter = Router()

authRouter.post('/login', apiUsageMiddleware, ...inputAuthValidation, inputCheckErrorsMiddleware, loginUserController)
authRouter.post('/refresh-token', checkRefreshToken, updateTokenController)
authRouter.post('/logout', checkRefreshToken, logoutUserController)
authRouter.get('/me', checkJWT, updateSession, userCheck)
authRouter.post('/registration-confirmation', apiUsageMiddleware, confirmUserValidation, inputCheckErrorsMiddleware, registrationConfirmationController)
authRouter.post('/registration', apiUsageMiddleware, ...inputUserValidation, inputCheckErrorsMiddleware, registrationUserController)
authRouter.post('/registration-email-resending', apiUsageMiddleware, resendEmailValidation, inputCheckErrorsMiddleware, registerEmailResendingController)
