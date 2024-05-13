import {NextFunction, Request, Response} from "express";
import {jwtService, securityRepository, usersQueryRepository} from "./compositionRoot";

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if (!token) {
        res.status(401).end()
        return
    }
    const tokenFields = jwtService.getFieldsForDeviceSession(token)
    if (!tokenFields) {
        res.status(401).end()
        return
    }
    const isTokenExpired = await securityRepository.findSessionByManuParams(tokenFields.deviceId,tokenFields.issuedAt)
    if (!isTokenExpired) {
        res.status(401).end()
        return
    }

    const userId = jwtService.getUserIdByRefreshToken(token)
    const deviceId = jwtService.getDeviceIdByRefreshToken(token)

    if (userId) {
        const user = usersQueryRepository.getUserById(userId)
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
