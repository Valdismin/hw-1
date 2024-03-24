import {Router} from "express";
import {
    createBlogController, deleteBlogController, findBlogController,
    getBlogsController, updateBlogController,
} from "../controllers/blogsController";
import {inputBlogValidation} from "../validation/blogs";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {authMiddleware} from "../middlewares/auth";
import {postForBlogValidation} from "../validation/posts";
import {createPostForBlogController, getPostsController} from "../controllers/postsController";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.get('/:blogId/posts', getPostsController)
blogsRouter.post('/:blogId/posts', [authMiddleware, ...postForBlogValidation], inputCheckErrorsMiddleware, createPostForBlogController)
blogsRouter.put('/:id', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, updateBlogController)
blogsRouter.delete('/:id', authMiddleware, deleteBlogController)
