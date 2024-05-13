import {Request, Response} from 'express'
import {queryHelper} from "../../utils/helpers";
import {OutputUsersType} from "./usersTypes";
import {UsersQueryRepository} from "./usersQueryRepository";
import {UsersService} from "./usersService";

export class UsersController {
    constructor(protected usersService: UsersService, protected usersQueryRepository: UsersQueryRepository) {
    }

    async createUser(req: Request, res: Response<OutputUsersType>) {
        const {login, email, password} = req.body
        const userId = await this.usersService.createUserService({login, email, password})
        if (!userId) {
            res.status(400).end()
            return
        }
        const user = await this.usersQueryRepository.getUserById(userId)
        if (!user) {
            res.status(400).end()
            return
        }
        const sanitizedUser = {
            id: user.id,
            email: user.userInfo.email,
            login: user.userInfo.login,
            createdAt: user.createdAt
        } as OutputUsersType

        res.status(201).json(sanitizedUser)
    }

    async getUsers(req: Request, res: Response) {
        const sanitizedQuery = queryHelper(req.query)
        const users = await this.usersQueryRepository.getAllUsers(sanitizedQuery)
        if (!users) {
            res.status(404).end()
            return
        }
        res.status(200).json(users)
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id
        const deletedBlog = await this.usersService.deleteUser(id)
        if (deletedBlog.length === 0) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }
}
