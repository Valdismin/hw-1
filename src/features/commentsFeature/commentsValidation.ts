import {body} from "express-validator";

export const commentValidation = body('content').trim().isString().bail().isLength({min: 20, max: 300}).bail().notEmpty().bail()
