import {authResultType, authService} from "../services/authService";
import {Request, Response} from "express";
import {authMeType} from "../types/authTypes";
import {securityService} from "../services/securityService";

export const loginUserController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const result = await authService.authUser(loginOrEmail, password)
    let deviceTitle = req.headers["user-agent"] as string
    if (!deviceTitle) {
        deviceTitle = "Unknown"
    }
    if (!result) {
        res.status(401).end()
        return
    }
    await securityService.createDeviceSession(result.refreshToken, req.ip!, deviceTitle)
    res.cookie('refreshToken', result.refreshToken, {httpOnly: true, secure: true})
    res.status(200).json({accessToken: result.accessToken})
}
export const logoutUserController = async (req: Request, res: Response) => {
    const result = await authService.logoutUser(req.cookies.refreshToken)
    if (!result) {
        res.status(401).end()
        return
    }
    res.status(204).json()
}

export const updateTokenController = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const userId = req.userId
    const result = await authService.updateTokens(refreshToken, userId)
    if (!result) {
        res.status(401).end()
        return
    }
    await securityService.updateAfterRefreshToken(result.refreshToken)
    res.cookie('refreshToken', result.refreshToken, {httpOnly: true, secure: true})
    res.status(200).json({accessToken: result.accessToken})
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
