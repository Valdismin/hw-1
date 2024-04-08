import {NextFunction, Request, Response} from "express";
import {JWTService} from "../services/JWTService";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']!.split(' ')[1]
    if (!token) {
        return res.status(401).end()
    }
    const user = JWTService.getUserIdByToken(token)
    req.userId = user.id
    next()
}
