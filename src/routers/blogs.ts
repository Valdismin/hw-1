import {Router} from "express";
import {
    createBlogController, deleteBlogController, findBlogController,
    getBlogsController, updateBlogController,
} from "../controllers/blogsController";
import {createBlogValidation, updateBlogValidation} from "../validation/blogs";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', createBlogValidation, inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.put('/:id', updateBlogValidation, inputCheckErrorsMiddleware, updateBlogController)
blogsRouter.delete('/:id', deleteBlogController)
