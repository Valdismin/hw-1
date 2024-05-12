import {body} from "express-validator";
import {UsersRepository} from "./usersRepository";
const usersRepository = new UsersRepository()

const userLoginValidation = body('login').trim().isString().bail().isLength({min: 3, max:10}).bail().matches(/^[a-zA-Z0-9_-]*$/).bail().custom(async (value) => {
    const user = await usersRepository.getUserForAuth(value)
    if(user){
        throw new Error('User already exists');
    }
})
const userEmailValidation = body('email').trim().isString().bail().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).bail().custom(async (value) => {
    const user = await usersRepository.getUserForAuth(value)
    if(user){
        throw new Error('User already exists');
    }
})
const userPasswordValidation = body('password').trim().isString().bail().isLength({min: 6, max:20}).bail()

export const inputUserValidation = [
    userLoginValidation,
    userEmailValidation,
    userPasswordValidation
]
