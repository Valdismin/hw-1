import {NextFunction, Request, Response} from "express";
import {jwtService, securityService} from "./compositionRoot";


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
