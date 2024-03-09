import {Router} from "express";
import {
    createBlogController, deleteBlogController, findBlogController,
    getBlogsController, updateBlogController,
} from "../controllers/blogsController";
import {createBlogValidation, updateBlogValidation} from "../validation/blogs";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {authMiddleware} from "../middlewares/auth";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', [authMiddleware, ...createBlogValidation], inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.put('/:id', [authMiddleware, ...updateBlogValidation], inputCheckErrorsMiddleware, updateBlogController)
blogsRouter.delete('/:id', authMiddleware, deleteBlogController)
