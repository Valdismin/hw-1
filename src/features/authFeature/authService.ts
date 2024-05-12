import {UsersDBType} from "../usersFeature/usersTypes";
import bcrypt from "bcrypt";
import {uuid} from "uuidv4";
import {add} from "date-fns/add";
import {sendConfirmationEmail, sendPasswordRecoveryEmail} from "../../managers/emailManager";
import {securityRepository} from "../securityFeature/securityRepository";
import {UsersRepository} from "../usersFeature/usersRepository";
import {JWTService} from "./JWTService";
import {recoveryPasswordRepository} from "../passwordRecoveryFeature/recoveryPasswordRepository";
import mongoose, {ObjectId} from "mongoose";

export type authResultType = {
    refreshToken: string
    accessToken: string
}
export class AuthService {
    constructor(protected usersRepository: UsersRepository,
                protected JWTService: JWTService) {}


    async authUser(loginOrEmail: string, password: string): Promise<authResultType | null> {
        const user = await this.usersRepository.getUserForAuth(loginOrEmail)
        if (!user) {
            return null
        }
        const hashedPassword = await bcrypt.hash(password, user?.userInfo.salt!)
        if (hashedPassword === user?.userInfo.hash) {
            const refreshToken = this.JWTService.createRefreshToken(user)
            const accessToken = this.JWTService.createToken(user)
            return {refreshToken: refreshToken, accessToken: accessToken}
        } else {
            return null
        }
    }
    async updateTokens(refreshToken: string, userId: ObjectId | null): Promise<authResultType | null> {
        if (!userId) {
            return null
        }
        const user = await this.usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        const oldTokenFields = await this.JWTService.getFieldsForDeviceSession(refreshToken)
        const newRefreshToken = this.JWTService.createRefreshToken(user, oldTokenFields?.deviceId)
        const newAccessToken = this.JWTService.createToken(user)
        const tokenFields = await this.JWTService.getFieldsForDeviceSession(newRefreshToken)
        if (!tokenFields) {
            return null
        }
        await securityRepository.updateAfterRefreshToken(userId, tokenFields.deviceId, tokenFields.issuedAt, tokenFields.expiredAt)
        await this.JWTService.killRefreshToken(refreshToken)
        return {refreshToken: newRefreshToken, accessToken: newAccessToken}
    }
    async getMe(userId: ObjectId) {
        const user: UsersDBType | null = await this.usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        return {
            email: user.userInfo.email,
            login: user.userInfo.login,
            userId: user._id
        }
    }
    async registration(email: string, login: string, password: string) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const newUser = {
            createdAt: new Date().toISOString(),
            userInfo: {
                login: login,
                email: email,
                hash: hash,
                salt: salt
            },
            userConfirmation: {
                confirmed: false,
                confirmCode: uuid(),
                expirationTime: add(new Date(), {hours: 1})
            }
        }
        const result = await this.usersRepository.create(newUser)
        try {
            await sendConfirmationEmail(email, newUser.userConfirmation.confirmCode)
        } catch (e) {
            if(result) {
                await this.usersRepository.deleteUser(result._id!)
            }
        }
    }
    async registrationConfirmation(code: string) {
        const user = await this.usersRepository.getUserByConfirmCode(code)
        if (!user) {
            return
        }
        return await this.usersRepository.confirmUser(user._id!)
    }
    async resendEmail(email: string) {
        const user = await this.usersRepository.getUserForAuth(email)
        if (!user) {
            return
        }
        const userConfirmation = {
            confirmed: false,
            confirmCode: uuid(),
            expirationTime: add(new Date(), {hours: 1})
        }

        try {
            await sendConfirmationEmail(email, userConfirmation.confirmCode)
            await this.usersRepository.updateUserConfirmation(user._id!, userConfirmation)
        } catch (e) {
            return
        }
    }
    async logoutUser(token: string) {
        return await this.JWTService.killRefreshToken(token)
    }
    async passwordRecovery(email: string) {
        const user = await this.usersRepository.getUserForAuth(email)
        //const userId: ObjectId =
        const recoveryCodeInfo = {
            userId: user!._id! as ObjectId,
            expirationTime: add(new Date(), {hours: 1}),
            recoveryCode: uuid(),
            isUsed: false
        }

        await recoveryPasswordRepository.addRecoveryCode(recoveryCodeInfo.recoveryCode, recoveryCodeInfo.userId, recoveryCodeInfo.expirationTime, recoveryCodeInfo.isUsed)

        try {
            await sendPasswordRecoveryEmail(email, recoveryCodeInfo.recoveryCode)
        } catch (e) {
            return
        }
    }
    async submitPasswordRecovery(recoveryCode: string, newPassword: string) {
        const recoveryCodeInfo = await recoveryPasswordRepository.findRecoveryCode(recoveryCode)
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)
        if (!recoveryCodeInfo?.userId) {
            return null
        }
        await this.usersRepository.updateUserPassword(recoveryCodeInfo.userId, hash, salt)
        await recoveryPasswordRepository.updateRecoveryCode(recoveryCode, true)
        return
    }
}
