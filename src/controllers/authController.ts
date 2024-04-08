import {authService} from "../services/authService";
import {Request, Response} from "express";
import {authMeType} from "../types/authTypes";

export const loginUserController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const result = await authService.authUser(loginOrEmail, password)
    if (!result) {
        res.status(401).end()
    }

    res.status(200).json({accessToken: result})
}

export const userCheck = async (req: Express.Request, res: Response<authMeType | null>) => {
    const user = await authService.getMe(req.userId!)
    if (!user) {
        res.status(401).end()
    }
    res.status(200).json(user)
}
