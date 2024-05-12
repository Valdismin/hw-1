import {Request, Response} from "express";
import {authMeType} from "./authTypes";
import {securityService} from "../securityFeature/securityService";
import {JWTService} from "./JWTService";
import {AuthService} from "./authService";
import {Schema} from "mongoose";

export class AuthController {
    constructor(protected authService: AuthService,
                protected JWTService: JWTService) {}

    async loginUser(req: Request, res: Response) {
        const {loginOrEmail, password} = req.body
        const result = await this.authService.authUser(loginOrEmail, password)
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

    async logoutUser(req: Request, res: Response) {
        const result = await this.authService.logoutUser(req.cookies.refreshToken)
        if (!result) {
            res.status(401).end()
            return
        }
        const tokenFields = this.JWTService.getFieldsForDeviceSession(req.cookies.refreshToken)
        if (!tokenFields) {
            return null
        }
        await securityService.deleteSpecificDeviceSession(tokenFields.userId, tokenFields.deviceId, req.cookies.refreshToken)
        return res.status(204).json()
    }

    async updateToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        //@ts-ignore
        //TODO: ask on the lesson
        const userId = req.userId as Schema.Types.ObjectId
        const result = await this.authService.updateTokens(refreshToken, userId)
        if (!result) {
            res.status(401).end()
            return
        }
        await securityService.updateAfterRefreshToken(result.refreshToken)
        res.cookie('refreshToken', result.refreshToken, {httpOnly: true, secure: true})
        res.status(200).json({accessToken: result.accessToken})
    }

    async userCheck(req: Request, res: Response<authMeType | null>) {
        //@ts-ignore
        //TODO: ask on the lesson
        const userId = req.userId as Schema.Types.ObjectId
        const user = await this.authService.getMe(userId)
        if (!user) {
            res.status(401).end()
            return
        }
        res.status(200).json(user)
    }

    async registrationConfirmation(req: Request, res: Response) {
        await this.authService.registrationConfirmation(req.body.code)
        res.status(204).end()

    }

    async registrationUser(req: Request, res: Response) {
        await this.authService.registration(req.body.email, req.body.login, req.body.password)
        res.status(204).end()
    }

    async registerEmailResending(req: Request, res: Response) {
        await this.authService.resendEmail(req.body.email)
        res.status(204).end()
    }

    async sendPasswordRecovery(req: Request, res: Response) {
        await this.authService.passwordRecovery(req.body.email)
        res.status(204).end()
    }

    async submitPasswordRecovery(req: Request, res: Response) {
        await this.authService.submitPasswordRecovery(req.body.recoveryCode, req.body.newPassword)
        res.status(204).end()
    }
}
