import {Router} from "express";
import {inputBlogValidation} from "./blogsValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {authMiddleware} from "../../middlewares/auth";
import {postForBlogValidation} from "../postsFeature/postsValidation";
import {updateSession} from "../../middlewares/updateSession";
import {blogsController} from "./compositionRoots";
import {postsController} from "../postsFeature/compositionRoots";

export const blogsRouter = Router()

blogsRouter.get('/', blogsController.getBlogs.bind(blogsController))
blogsRouter.post('/', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, updateSession, blogsController.createBlog.bind(blogsController))
blogsRouter.get('/:id', blogsController.findBlog.bind(blogsController))
blogsRouter.get('/:blogId/posts', postsController.getPosts.bind(postsController))
blogsRouter.post('/:blogId/posts', [authMiddleware, ...postForBlogValidation], inputCheckErrorsMiddleware, updateSession, postsController.createPostForBlog.bind(postsController))
blogsRouter.put('/:id', [authMiddleware, ...inputBlogValidation], inputCheckErrorsMiddleware, updateSession, blogsController.updateBlog.bind(blogsController))
blogsRouter.delete('/:id', authMiddleware, updateSession, blogsController.deleteBlog.bind(blogsController))
