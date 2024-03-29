import bcrypt from "bcrypt";
import {usersQueryRepository} from "../repositories/usersQueryRepository";

export const authService = {
    authUser: async (loginOrEmail: string, password: string) => {
        const user = await usersQueryRepository.getUserForAuth(loginOrEmail)
        const hashedPassword = await bcrypt.hash(password, user?.salt!)
        return hashedPassword === user?.hash;
    }
}
