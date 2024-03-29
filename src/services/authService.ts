import bcrypt from "bcrypt";
import {authRepository} from "../repositories/authRepository";

export const authService = {
    authUser: async (user, password) => {
        await authRepository.login(user.loginOrEmail)
        const hashedPassword = await bcrypt.hash(password, user?.salt!)
        return hashedPassword === user?.hash;
    }
}
