import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {JWTService} from "./JWTService";
import {OutputUsersType} from "../types/usersTypes";
import bcrypt from "bcrypt";
import {usersRepository} from "../repositories/usersRepository";
import {uuid} from "uuidv4";
import {add} from "date-fns/add";
import {sendEmail} from "../managers/emailManager";

export const authService = {
    authUser: async (loginOrEmail: string, password: string) => {
        const user = await usersQueryRepository.getUserForAuth(loginOrEmail)
        if (!user) {
            return false
        }
        const hashedPassword = await bcrypt.hash(password, user?.userInfo.salt!)
        if (hashedPassword === user?.userInfo.hash) {
            return JWTService.createToken(user);
        } else {
            return false
        }
    },
    getMe: async (userId: string) => {
        const user: OutputUsersType | null = await usersQueryRepository.getUserById(userId)
        if (!user) {
            return null
        }
        return {
            email: user.email,
            login: user.login,
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
                expirationTime: add(new Date(), {seconds: 10})
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
        const user = await usersQueryRepository.getUserByConfirmCode(code)
        if (!user) {
            return
        }
       return await usersRepository.confirmUser(user.id)
    },
    resendEmail: async (email: string) => {
        const user = await usersQueryRepository.getUserForAuth(email)
        if (!user) {
            return
        }
        try {
            await sendEmail(email, user.userConfirmation.confirmCode)
        } catch (e) {
            return
        }
    }
}
