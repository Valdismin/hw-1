import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {JWTService} from "./JWTService";
import {OutputUsersType} from "../types/usersTypes";

export const authService = {
    authUser: async (loginOrEmail: string, password: string) => {
        const user = await usersQueryRepository.getUserForAuth(loginOrEmail)
        if (!user) {
            return false
        }
        return JWTService.createToken(user);
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

    }
}
