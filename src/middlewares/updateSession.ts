import {NextFunction, Request, Response} from "express";
import {JWTService} from "../features/authFeature/JWTService";
import {securityService} from "../features/securityFeature/securityService";

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        next()
        return
    }
    const tokenFields = JWTService.getFieldsForDeviceSession(refreshToken)
    if(!tokenFields) {
        return null
    }
    await securityService.updateLastActiveDate(tokenFields.userId, tokenFields.deviceId)
    return next()
}
