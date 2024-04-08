import {Router} from "express";
import {
    createPostComment,
    createPostController, deletePostController,
    getPostByIdController, getPostCommentsController,
    getPostsController,
    updatePostController
} from "../controllers/postsController";
import {authMiddleware} from "../middlewares/auth";
import {postValidation} from "../validation/posts";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {commentValidation} from "../validation/comments";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, createPostController)
postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, updatePostController)
postsRouter.delete('/:id', authMiddleware, deletePostController)
postsRouter.get('/:id/comments', getPostCommentsController)
postsRouter.post('/:id/comments', authMiddleware, commentValidation, inputCheckErrorsMiddleware, createPostComment)
