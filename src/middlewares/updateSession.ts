import {NextFunction, Request, Response} from "express";
import {securityRepository} from "../repositories/securityRepository";
import {JWTService} from "../services/JWTService";

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    const tokenFields = JWTService.getFieldsForDeviceSession(refreshToken)

    const lastActiveDate = new Date().toISOString()
    await securityRepository.updateLastActiveDate(tokenFields.userId, tokenFields.deviceId, lastActiveDate)
    next()
}
