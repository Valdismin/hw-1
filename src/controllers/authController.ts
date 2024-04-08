import {authService} from "../services/authService";
import {Request, Response} from "express";
import {authMeType} from "../types/authTypes";

export const loginUserController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const result = await authService.authUser(loginOrEmail, password)
    if (!result) {
        res.status(401).end()
        return
    }
console.debug('result', result)
    res.status(200).json({accessToken: result})
}

export const userCheck = async (req: Request, res: Response<authMeType | null>) => {
    console.debug('req.userId', req.userId)
    const user = await authService.getMe(req.userId!)
    if (!user) {
        res.status(401).end()
        return
    }
    res.status(200).json(user)
}
