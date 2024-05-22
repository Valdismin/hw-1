import bcrypt from 'bcrypt';
import {InputUsersType} from "./usersTypes";
import {UsersRepository} from "./usersRepository";
import {inject, injectable} from "inversify";

@injectable()
export class UsersService {
    constructor(@inject(UsersRepository) protected usersRepository: UsersRepository) {
    }
    async createUserService(user: InputUsersType) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const newUser = {
            createdAt: new Date().toISOString(),
            userInfo: {
                login: user.login,
                email: user.email,
                hash: hashedPassword,
                salt: salt,
            },
            userConfirmation: {
                confirmed: true,
                confirmCode: 'unusedCode',
                expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24)
            }
        }
        return await this.usersRepository.create(newUser)
    }
    async deleteUser(id: string){
        return await this.usersRepository.deleteUser(id)
    }
}
