import {NextFunction, Request, Response} from "express";
import {JWTService} from "../features/authFeature/JWTService";
import {securityService} from "../features/securityFeature/securityService";
import {RefreshTokenRepository} from "../features/authFeature/refreshTokenRepository";

const refreshTokenRepository = new RefreshTokenRepository();
const jwtService = new JWTService(refreshTokenRepository)

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        next()
        return
    }
    const tokenFields = jwtService.getFieldsForDeviceSession(refreshToken)
    if(!tokenFields) {
        return null
    }
    await securityService.updateLastActiveDate(tokenFields.userId, tokenFields.deviceId)
    return next()
}
