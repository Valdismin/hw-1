import {body} from "express-validator";
import {blogsRepository} from "../repositories/blogsRepository";

const postTitleValidation = body('title').isString().bail().isLength({min: 1, max: 30}).bail().notEmpty().bail()
const postShortDescriptionValidation = body('shortDescription').isString().bail().isLength({min: 1, max: 100}).bail().notEmpty().bail()
const postContentValidation = body('content').isString().bail().isLength({min: 1, max: 1000}).bail().notEmpty().bail()
const postBlogIdValidation = body('blogId').isString().bail().notEmpty().bail().custom(async (value) => {
   const blog = await blogsRepository.findBlogById(value)
    if (!blog) {
         throw new Error('Blog not found')
    }
})


export const postValidation = [
    postTitleValidation,
    postShortDescriptionValidation,
    postContentValidation,
    postBlogIdValidation
]
