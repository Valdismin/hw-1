import {Router} from "express";
import {commentValidation, likeValidation} from "./commentsValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {checkJWT} from "../../middlewares/checkJWT";
import {updateSession} from "../../middlewares/updateSession";
import {container} from "../../db/ioc";
import {CommentsController} from "./commentsController";

const commentsController = container.get(CommentsController)

export const commentsRouter = Router()

commentsRouter.get('/:id', updateSession, commentsController.getCommentById.bind(commentsController))
commentsRouter.delete('/:id', checkJWT, updateSession, commentsController.deleteComment.bind(commentsController))
commentsRouter.put('/:id/like-status', checkJWT ,likeValidation, inputCheckErrorsMiddleware, updateSession, commentsController.addLikeToComment.bind(commentsController))
commentsRouter.put('/:id', checkJWT, commentValidation, inputCheckErrorsMiddleware, updateSession, commentsController.updateComment.bind(commentsController))
