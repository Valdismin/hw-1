import bcrypt from "bcrypt";
import {authRepository} from "../repositories/authRepository";

export const authService = {
    authUser: async (loginOrEmail, password) => {
        const user = await authRepository.login(loginOrEmail)
        const hashedPassword = await bcrypt.hash(password, user?.salt!)
        return hashedPassword === user?.hash;
    }
}
