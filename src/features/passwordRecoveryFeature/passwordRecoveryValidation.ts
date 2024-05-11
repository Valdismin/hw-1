import {body} from "express-validator";
import {recoveryPasswordRepository} from "./recoveryPasswordRepository";

export const passwordRecoveryEmailValidation = body('email').trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).bail()
export const passwordRecoveryPasswordValidation = body('newPassword').trim().isString().bail().isLength({min: 6, max:20}).bail()
export const passwordRecoveryCodeValidation = body('recoveryCode').trim().isString().bail().custom(async (value) => {
   const result = await recoveryPasswordRepository.findRecoveryCode(value)
    if(!result) {
        throw new Error('Invalid recovery code');
    }
    if(result.isUsed) {
        throw new Error('Recovery code is already used');
    }
    if(result.expiredAt < new Date()) {
        throw new Error('Recovery code is expired');
    }
})


export const passwordRecoveryValidation = [
    passwordRecoveryCodeValidation,
    passwordRecoveryPasswordValidation
]
