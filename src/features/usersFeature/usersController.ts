import {Request, Response} from 'express'
import {queryHelper, sanitizeUser} from "../../utils/helpers";
import {OutputUsersType} from "./usersTypes";
import {UsersQueryRepository} from "./usersQueryRepository";
import {UsersService} from "./usersService";
import {Schema} from "mongoose";

export class UsersController {
    constructor(protected usersService: UsersService, protected usersQueryRepository: UsersQueryRepository) {
    }
     async createUser(req: Request, res: Response<OutputUsersType | null>) {
        const {login, email, password} = req.body
        const user = await this.usersService.createUserService({login, email, password})
        if(!user) {
            res.status(400).end()
            return
        }
        const sanitizedUser = sanitizeUser(user)
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
         //@ts-ignore
         //TODO: ask on the lesson
         const id = req.params.id as Schema.Types.ObjectId
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
