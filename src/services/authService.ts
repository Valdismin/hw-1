import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {JWTService} from "./JWTService";
import {UsersDBType} from "../types/usersTypes";
import bcrypt from "bcrypt";
import {usersRepository} from "../repositories/usersRepository";
import {uuid} from "uuidv4";
import {add} from "date-fns/add";
import {sendEmail} from "../managers/emailManager";
import {securityRepository} from "../repositories/securityRepository";

export type authResultType = {
    refreshToken: string
    accessToken: string
}
export const authService = {
    authUser: async (loginOrEmail: string, password: string): Promise<authResultType | null> => {
        const user = await usersRepository.getUserForAuth(loginOrEmail)
        if (!user) {
            return null
        }
        const hashedPassword = await bcrypt.hash(password, user?.userInfo.salt!)
        if (hashedPassword === user?.userInfo.hash) {
            const refreshToken = JWTService.createRefreshToken(user)
            const accessToken = JWTService.createToken(user)
            return {refreshToken: refreshToken, accessToken: accessToken}
        } else {
            return null
        }
    },
    updateTokens: async (refreshToken: string, userId: string | null): Promise<authResultType | null> => {
        if (!userId) {
            return null
        }
        const user = await usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        const oldTokenFields = await JWTService.getFieldsForDeviceSession(refreshToken)
        const newRefreshToken = JWTService.createRefreshToken(user, oldTokenFields?.deviceId)
        const newAccessToken = JWTService.createToken(user)
        const tokenFields = await JWTService.getFieldsForDeviceSession(newRefreshToken)
        if (!tokenFields) {
            return null
        }
        await securityRepository.updateAfterRefreshToken(userId, tokenFields.deviceId, tokenFields.issuedAt, tokenFields.expiredAt)
        await JWTService.killRefreshToken(refreshToken)
        return {refreshToken: newRefreshToken, accessToken: newAccessToken}
    },
    getMe: async (userId: string) => {
        const user: UsersDBType | null = await usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        return {
            email: user.userInfo.email,
            login: user.userInfo.login,
            userId: user.id
        }
    },
    registration: async (email: string, login: string, password: string) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const newUser = {
            id: `${Date.now() + Math.random()}`,
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
        await usersRepository.create(newUser)
        try {
            await sendEmail(email, newUser.userConfirmation.confirmCode)
        } catch (e) {
            await usersRepository.deleteUser(newUser.id)
        }
    },
    registrationConfirmation: async (code: string) => {
        const user = await usersRepository.getUserByConfirmCode(code)
        if (!user) {
            return
        }
        return await usersRepository.confirmUser(user.id)
    },
    resendEmail: async (email: string) => {
        const user = await usersRepository.getUserForAuth(email)
        if (!user) {
            return
        }
        const userConfirmation = {
            confirmed: false,
            confirmCode: uuid(),
            expirationTime: add(new Date(), {hours: 1})
        }

        try {
            await sendEmail(email, userConfirmation.confirmCode)
            await usersRepository.updateUserConfirmation(user.id, userConfirmation)
        } catch (e) {
            return
        }
    },
    logoutUser: async (token: string) => {
        return await JWTService.killRefreshToken(token)
    }
}
