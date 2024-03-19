import {body} from "express-validator";
import mongoose from "mongoose";

const postTitleValidation = body('title').trim().isString().bail().isLength({min: 1, max: 30}).bail().notEmpty().bail()
const postShortDescriptionValidation = body('shortDescription').trim().isString().bail().isLength({min: 1, max: 100}).bail().notEmpty().bail()
const postContentValidation = body('content').trim().isString().bail().isLength({min: 1, max: 1000}).bail().notEmpty().bail()
const postBlogIdValidation = body('blogId').custom((value) => mongoose.Types.ObjectId.isValid(value))


export const postValidation = [
    postTitleValidation,
    postShortDescriptionValidation,
    postContentValidation,
    postBlogIdValidation
]
