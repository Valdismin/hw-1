import {Router} from "express";
import {
    createPostController, deletePostController,
    getPostByIdController,
    getPostsController,
    updatePostController
} from "../controllers/postsController";
import {authMiddleware} from "../middlewares/auth";
import {postValidation} from "../validation/posts";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.post('/', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, createPostController)
postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, updatePostController)
postsRouter.delete('/:id', deletePostController)
