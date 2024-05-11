import {body} from "express-validator";

const userLoginOrEmailValidation = body('loginOrEmail').trim().isString()
const userPasswordValidation = body('password').trim().isString()

export const inputAuthValidation = [
    userLoginOrEmailValidation,
    userPasswordValidation
]
