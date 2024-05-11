import {Router} from "express";
import {
    createBlogController, deleteBlogController, findBlogController,
    getBlogsController, updateBlogController,
} from "./blogsController";
import {inputBlogValidation} from "./blogsValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {authMiddleware} from "../../middlewares/auth";
import {postForBlogValidation} from "../postsFeature/postsValidation";
import {createPostForBlogController, getPostsController} from "../postsFeature/postsController";
import {updateSession} from "../../middlewares/updateSession";
import {blogsController} from "./compositionRoots";

export const blogsRouter = Router()

blogsRouter.get('/', blogsController.getBlogs.bind(blogsController))
blogsRouter.post('/', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, updateSession, blogsController.createBlog.bind(blogsController))
blogsRouter.get('/:id', blogsController.findBlog.bind(blogsController))
blogsRouter.get('/:blogId/posts', getPostsController)
blogsRouter.post('/:blogId/posts', [authMiddleware, ...postForBlogValidation], inputCheckErrorsMiddleware, updateSession, createPostForBlogController)
blogsRouter.put('/:id', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, updateSession, blogsController.updateBlog.bind(blogsController))
blogsRouter.delete('/:id', authMiddleware, updateSession, blogsController.deleteBlog.bind(blogsController))
