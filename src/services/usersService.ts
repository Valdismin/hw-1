import bcrypt from 'bcrypt';
import {InputUsersType} from "../types/usersTypes";

export const usersService = {
    createUserService: async (user: InputUsersType) => {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        return {
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            login: user.login,
            email: user.email,
            hash: hashedPassword,
            salt: salt,
        }
    },
}
