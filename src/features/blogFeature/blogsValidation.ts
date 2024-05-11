import {body} from "express-validator";

const blogNameValidation =  body('name').trim().isString().bail().isLength({min: 1, max:15}).bail()
const blogDescriptionValidation = body('description').trim().isString().bail().isLength({min: 1, max:500}).bail()
const blogURLValidation = body('websiteUrl').trim().isString().bail().isLength({min: 1, max:100}).bail().matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).bail()
export const inputBlogValidation = [
    blogNameValidation,
    blogDescriptionValidation,
    blogURLValidation
]
