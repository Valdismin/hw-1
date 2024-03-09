import {Router} from "express";
import {
    createBlogController, deleteBlogController, findBlogController,
    getBlogsController, updateBlogController,
} from "../controllers/blogsController";
import {inputBlogValidation} from "../validation/blogs";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {authMiddleware} from "../middlewares/auth";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.put('/:id', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, updateBlogController)
blogsRouter.delete('/:id', authMiddleware, deleteBlogController)
