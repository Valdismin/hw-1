import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth";
import {postValidation} from "./postsValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {commentValidation} from "../commentsFeature/commentsValidation";
import {checkJWT} from "../../middlewares/checkJWT";
import {updateSession} from "../../middlewares/updateSession";
import {container} from "../../db/ioc";
import {PostsController} from "./postsController";

const postsController = container.get(PostsController)

export const postsRouter = Router()

postsRouter.get('/', updateSession, postsController.getPosts.bind(postsController))
postsRouter.post('/', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, updateSession, postsController.createPost.bind(postsController))
postsRouter.get('/:id', updateSession, postsController.getPostById.bind(postsController))
postsRouter.put('/:id', [authMiddleware, ...postValidation], inputCheckErrorsMiddleware, updateSession, postsController.updatePost.bind(postsController))
postsRouter.delete('/:id', authMiddleware, updateSession, postsController.deletePost.bind(postsController))
postsRouter.get('/:id/comments', updateSession, postsController.getPostComments.bind(postsController))
postsRouter.post('/:id/comments', checkJWT, commentValidation, inputCheckErrorsMiddleware, updateSession, postsController.createPostComment.bind(postsController))
postsRouter.put('/:id/like-status', checkJWT, updateSession, postsController.addLike.bind(postsController))
