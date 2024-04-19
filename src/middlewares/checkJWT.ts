import {NextFunction, Request, Response} from "express";
import {JWTService} from "../services/JWTService";
import {usersQueryRepository} from "../repositories/usersQueryRepository";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).end()
        return
    }

    if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
        res.status(401).end()
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = JWTService.getUserIdByToken(token)
    if (userId) {
        const user = usersQueryRepository.getUserById(userId)
        if (!user) {
            res.status(401).end()
            return
        }
        req.userId = userId
        next()
    }
}
