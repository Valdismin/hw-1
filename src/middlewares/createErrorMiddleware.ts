import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {OutputErrorsType} from "../types/videosTypes";

export const inputCheckErrorsMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    const e = validationResult(req)
    const errors = e.array()
    if (errors.length) {
        res.status(400).json({
            errorsMessages: errors.map((error: any) => {
                return {message: error.msg, field: error.path}
            })
        })
        return
    }

    next()
}
