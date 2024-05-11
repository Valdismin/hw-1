import {NextFunction, Request, Response} from "express";
import {JWTService} from "../features/authFeature/JWTService";
import {usersRepository} from "../features/usersFeature/usersRepository";
import {securityRepository} from "../features/securityFeature/securityRepository";

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if (!token) {
        res.status(401).end()
        return
    }
    const tokenFields = JWTService.getFieldsForDeviceSession(token)
    if (!tokenFields) {
        res.status(401).end()
        return
    }
    const isTokenExpired = await securityRepository.findSessionByManuParams(tokenFields.deviceId,tokenFields.issuedAt)
    if (!isTokenExpired) {
        res.status(401).end()
        return
    }

    const userId = JWTService.getUserIdByRefreshToken(token)
    const deviceId = JWTService.getDeviceIdByRefreshToken(token)

    if (userId) {
        const user = usersRepository.getUserById(userId)
        if (!user) {
            res.status(401).end()
            return
        }
        req.userId = userId
        req.deviceId = deviceId
        return next()
    }
    res.status(401).end()
}
