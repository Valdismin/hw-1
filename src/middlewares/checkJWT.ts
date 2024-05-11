import {NextFunction, Request, Response} from "express";
import {JWTService} from "../features/authFeature/JWTService";
import {usersRepository} from "../features/usersFeature/usersRepository";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).end()
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = JWTService.getUserIdByToken(token)

    if (userId) {
        const user = usersRepository.getUserById(userId)
        if (!user) {
            res.status(401).end()
            return
        }
        req.userId = userId
        return next()
    }
    res.status(401).end()
}
