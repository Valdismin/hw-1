import {body} from "express-validator";
import {blogsRepository} from "../repositories/blogsRepository";

const postTitleValidation = body('title').trim().isString().bail().isLength({min: 1, max: 30}).bail().notEmpty().bail()
const postShortDescriptionValidation = body('shortDescription').trim().isString().bail().isLength({min: 1, max: 100}).bail().notEmpty().bail()
const postContentValidation = body('content').trim().isString().bail().isLength({min: 1, max: 1000}).bail().notEmpty().bail()
const postBlogIdValidation = body('blogId').isString().bail().notEmpty().bail().custom(async (value) => {
    const blog = await blogsRepository.findBlogById(value)
    if (!blog) {
        throw new Error('Blog not found')
    }
    return true
})

export const postValidation = [
    postTitleValidation,
    postShortDescriptionValidation,
    postContentValidation,
    postBlogIdValidation
]
