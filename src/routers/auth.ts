import {Router} from "express";
import {
    loginUserController,
    logoutUserController,
    registerEmailResendingController,
    registrationConfirmationController,
    registrationUserController,
    sendPasswordRecoveryController, submitPasswordRecoveryController,
    updateTokenController,
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
import {setApiUsage} from "../middlewares/setApiUsage";
import {
    passwordRecoveryEmailValidation,
    passwordRecoveryPasswordValidation,
    passwordRecoveryValidation
} from "../validation/password-recovery";

export const authRouter = Router()

authRouter.post('/login', setApiUsage, apiUsageMiddleware, ...inputAuthValidation, inputCheckErrorsMiddleware, loginUserController)
authRouter.post('/refresh-token', setApiUsage, checkRefreshToken, updateSession, updateTokenController)
authRouter.post('/logout', setApiUsage, checkRefreshToken, logoutUserController)
authRouter.get('/me', checkJWT, updateSession, userCheck)
authRouter.post('/registration-confirmation', setApiUsage, apiUsageMiddleware, confirmUserValidation, inputCheckErrorsMiddleware, registrationConfirmationController)
authRouter.post('/registration', setApiUsage, apiUsageMiddleware, ...inputUserValidation, inputCheckErrorsMiddleware, registrationUserController)
authRouter.post('/registration-email-resending', setApiUsage, apiUsageMiddleware, resendEmailValidation, inputCheckErrorsMiddleware, registerEmailResendingController)
authRouter.post('/password-recovery', setApiUsage, apiUsageMiddleware, passwordRecoveryEmailValidation, inputCheckErrorsMiddleware, sendPasswordRecoveryController)
authRouter.post('/new-password', setApiUsage, apiUsageMiddleware, ...passwordRecoveryValidation, inputCheckErrorsMiddleware, submitPasswordRecoveryController)
