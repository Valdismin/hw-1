import {body} from "express-validator";
import {UsersRepository} from "../usersFeature/usersRepository";
import {UsersQueryRepository} from "../usersFeature/usersQueryRepository";

const usersRepository = new UsersRepository();
const usersQueryRepository = new UsersQueryRepository();

export const confirmUserValidation = body('code').trim().isString().custom(async (value) => {
    const userId = await usersRepository.getUserByConfirmCode(value)
    if (!userId) {
        throw new Error('User not found');
    }
    const user = await usersQueryRepository.getUserById(userId!)
    if (!user) {
        throw new Error('User not found');
    }
    if (user!.userConfirmation.confirmed) {
        throw new Error('User already confirmed');
    }
    if (user!.userConfirmation.expirationTime < new Date()) {
        throw new Error('Code expired');
    }
    if (user!.userConfirmation.confirmCode !== value) {
        throw new Error('Invalid code');
    }
})

export const resendEmailValidation = body('email').trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).bail().custom(async (value) => {
    const userId = await usersRepository.getUserForAuth(value)
    if (!userId) {
        throw new Error('User not found');
    }
    const user = await usersQueryRepository.getUserById(userId!)
    if (!user) {
        throw new Error('User not found');
    }
    if (user.userConfirmation.confirmed) {
        throw new Error('User already confirmed');
    }
})
