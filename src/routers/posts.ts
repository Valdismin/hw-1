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
import {checkJWT} from "../middlewares/checkJWT";
import {updateSession} from "../middlewares/updateSession";

export const postsRouter = Router()

postsRouter.get('/', updateSession, getPostsController)
postsRouter.post('/', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, updateSession, createPostController)
postsRouter.get('/:id', updateSession, getPostByIdController)
postsRouter.put('/:id', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, updateSession, updatePostController)
postsRouter.delete('/:id', authMiddleware, updateSession, deletePostController)
postsRouter.get('/:id/comments', updateSession, getPostCommentsController)
postsRouter.post('/:id/comments', checkJWT, commentValidation, inputCheckErrorsMiddleware, updateSession, createPostComment)
