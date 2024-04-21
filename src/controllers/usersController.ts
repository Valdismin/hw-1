import {Request, Response} from 'express'
import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {queryHelper, sanitizeUser} from "../utils/helpers";
import {OutputUsersType} from "../types/usersTypes";
import {usersService} from "../services/usersService";

export const createUserController = async (req: Request, res: Response<OutputUsersType | null>) => {
    const {login, email, password} = req.body
    const user = await usersService.createUserService({login, email, password})
    if(!user) {
        res.status(400).end()
        return
    }
    const sanitizedUser = sanitizeUser(user)
    res.status(201).json(sanitizedUser)
}

export const getUsersController = async (req: Request, res: Response) => {
    const sanitizedQuery = queryHelper(req.query)
    const users = await usersQueryRepository.getAllUsers(sanitizedQuery)
    if (!users) {
        res.status(404).end()
        return
    }
    res.status(200).json(users)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const id = req.params.id
    const deletedBlog = await usersService.deleteUser(id)
    if (deletedBlog.length === 0) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}
