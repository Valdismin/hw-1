import {FieldValidationError, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {OutputErrorsType} from "../types/errorsTypes";

export const inputCheckErrorsMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    const e = validationResult(req)
    const errors = e.array() as FieldValidationError[]

    if (errors.length) {
        res.status(400).json({
            errorsMessages: errors.map((error) => {
                return {message: error.msg, field: error.path}
            })
        })
        return
    }

    next()
}
