import {body} from "express-validator";

const blogNameValidation = body('name').trim().isString().bail().isLength({min: 1}).bail()
const blogDescriptionValidation = body('description').trim().isString().bail().notEmpty().bail()
const blogURLValidation = body('websiteUrl').trim().isString().bail().notEmpty().bail()
export const createBlogValidation = [
    blogNameValidation,
    blogDescriptionValidation,
    blogURLValidation
]

const blogNameUpdateValidation = body('name').trim().isString().bail().isLength({min: 1, max:15}).bail()
const blogDescriptionUpdateValidation = body('description').trim().isString().bail().isLength({min: 1, max:500}).bail()
const blogURLUpdateValidation = body('websiteUrl').trim().isString().bail().isLength({min: 1, max:100}).bail().matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).bail()

export const updateBlogValidation = [
    blogNameUpdateValidation,
    blogDescriptionUpdateValidation,
    blogURLUpdateValidation
]
