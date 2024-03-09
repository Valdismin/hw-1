import {body} from "express-validator";

const blogNameValidation = body('name').trim().isString().isLength({min: 1})
const blogDescriptionValidation = body('description').trim().isString().notEmpty()
const blogURLValidation = body('websiteUrl').trim().isString().notEmpty()
export const createBlogValidation = [
    blogNameValidation,
    blogDescriptionValidation,
    blogURLValidation
]

const blogNameUpdateValidation = body('name').trim().isString().isLength({min: 1, max:15})
const blogDescriptionUpdateValidation = body('description').trim().isString().isLength({min: 1, max:500})
const blogURLUpdateValidation = body('websiteUrl').trim().isString().isLength({min: 1, max:100}).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)

export const updateBlogValidation = [
    blogNameUpdateValidation,
    blogDescriptionUpdateValidation,
    blogURLUpdateValidation
]
