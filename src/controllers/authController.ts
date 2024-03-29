import {authService} from "../services/authService";
import {Request, Response} from "express";

export const loginUserController = async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const result = await authService.authUser(loginOrEmail, password)
    if (!result) {
        res.status(401).end()
    }

    res.status(204).end()
}
