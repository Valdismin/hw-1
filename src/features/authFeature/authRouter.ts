import {Router} from "express";
import {inputAuthValidation} from "./authValidation";
import {checkJWT} from "../../middlewares/checkJWT";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {inputUserValidation} from "../usersFeature/usersValidation";
import {confirmUserValidation, resendEmailValidation} from "./confirmUserValidation";
import {checkRefreshToken} from "../../middlewares/checkRefreshToken";
import {apiUsageMiddleware} from "../../middlewares/apiUsage";
import {updateSession} from "../../middlewares/updateSession";
import {setApiUsage} from "../../middlewares/setApiUsage";
import {
    passwordRecoveryEmailValidation,
    passwordRecoveryValidation
} from "../passwordRecoveryFeature/passwordRecoveryValidation";
import {authController} from "./compositionRoot";

export const authRouter = Router()

authRouter.post('/login', setApiUsage, apiUsageMiddleware, ...inputAuthValidation, inputCheckErrorsMiddleware, authController.loginUser.bind(authController))
authRouter.post('/refresh-token', setApiUsage, checkRefreshToken, updateSession, authController.updateToken.bind(authController))
authRouter.post('/logout', setApiUsage, checkRefreshToken, authController.logoutUser.bind(authController))
authRouter.get('/me', checkJWT, updateSession, authController.userCheck.bind(authController))
authRouter.post('/registration-confirmation', setApiUsage, apiUsageMiddleware, confirmUserValidation, inputCheckErrorsMiddleware, authController.registrationConfirmation.bind(authController))
authRouter.post('/registration', setApiUsage, apiUsageMiddleware, ...inputUserValidation, inputCheckErrorsMiddleware, authController.registrationUser.bind(authController))
authRouter.post('/registration-email-resending', setApiUsage, apiUsageMiddleware, resendEmailValidation, inputCheckErrorsMiddleware, authController.registerEmailResending.bind(authController))
authRouter.post('/password-recovery', setApiUsage, apiUsageMiddleware, passwordRecoveryEmailValidation, inputCheckErrorsMiddleware, authController.sendPasswordRecovery.bind(authController))
authRouter.post('/new-password', setApiUsage, apiUsageMiddleware, ...passwordRecoveryValidation, inputCheckErrorsMiddleware, authController.submitPasswordRecovery.bind(authController))
