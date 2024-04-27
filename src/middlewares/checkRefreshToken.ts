import {NextFunction, Request, Response} from "express";
import {JWTService} from "../services/JWTService";
import {usersRepository} from "../repositories/usersRepository";

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if (!token) {
        res.status(401).end()
        return
    }
    const isTokenExpired = await JWTService.checkRefreshTokenExpire(token)

    if (isTokenExpired) {
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
