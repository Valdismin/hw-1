import {NextFunction, Request, Response} from "express";
import {container} from "../db/ioc";
import {JWTService} from "../features/authFeature/JWTService";
import {UsersQueryRepository} from "../features/usersFeature/usersQueryRepository";

const jwtService = container.get(JWTService)
const usersQueryRepository = container.get(UsersQueryRepository)

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).end()
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = jwtService.getUserIdByToken(token)

    if (userId) {
        const user = usersQueryRepository.getUserById(userId)
        if (!user) {
            res.status(401).end()
            return
        }

        req.userId = userId
        return next()
    }
    res.status(401).end()
}
