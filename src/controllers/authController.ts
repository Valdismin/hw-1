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
    res.status(200).json({accessToken: result})
}

export const userCheck = async (req: Request, res: Response<authMeType | null>) => {
    const user = await authService.getMe(req.userId!)
    if (!user) {
        res.status(401).end()
        return
    }
    res.status(200).json(user)
}

export const registrationConfirmationController = async (req: Request, res: Response) => {
    await authService.registrationConfirmation(req.body.code)
    res.status(204).end()

}

export const registrationUserController = async (req: Request, res: Response) => {
    await authService.registration(req.body.email, req.body.login, req.body.password)
    res.status(204).end()

}
export const registerEmailResendingController = async (req: Request, res: Response) => {
    await authService.resendEmail(req.body.email)
    res.status(204).end()
}
