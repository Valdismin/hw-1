import {body} from "express-validator";
import {usersRepository} from "../repositories/usersRepository";

export const confirmUserValidation = body('code').trim().isString().custom(async (value) => {
    const user = await usersRepository.getUserByConfirmCode(value)
    if(!user){
        throw new Error('User not found');
    }
    if(user!.userConfirmation.confirmed){
        throw new Error('User already confirmed');
    }
    if(user!.userConfirmation.expirationTime < new Date()){
        throw new Error('Code expired');
    }
    if(user!.userConfirmation.confirmCode !== value){
        throw new Error('Invalid code');
    }
})

export const resendEmailValidation = body('email').trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).bail().custom(async (value) => {
    const user = await usersRepository.getUserForAuth(value)
    if(!user){
        throw new Error('User not found');
    }
    if(user.userConfirmation.confirmed){
        throw new Error('User already confirmed');
    }
})
