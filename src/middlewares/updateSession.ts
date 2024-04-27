import {NextFunction, Request, Response} from "express";
import {securityRepository} from "../repositories/securityRepository";
import {JWTService} from "../services/JWTService";
import {securityService} from "../services/securityService";

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const tokenFields = JWTService.getFieldsForDeviceSession(refreshToken)

    await securityService.updateLastActiveDate(tokenFields.userId, tokenFields.deviceId)
    next()
}
