import bcrypt from 'bcrypt';
import {InputUsersType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";

export const usersService = {
    createUserService: async (user: InputUsersType) => {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const newUser = {
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            userInfo: {
                login: user.login,
                email: user.email,
                hash: hashedPassword,
                salt: salt,
            },
            userConfirmation: {
                confirmed: true,
                confirmCode: '',
                expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24)
            }
        }
        return await usersRepository.create(newUser)
    },
    deleteUser: async (id: string) => await usersRepository.deleteUser(id)
}
