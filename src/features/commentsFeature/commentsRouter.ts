import {Router} from "express";
import {commentValidation} from "./commentsValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {checkJWT} from "../../middlewares/checkJWT";
import {updateSession} from "../../middlewares/updateSession";
import {commentsController} from "./compositionRoots";

export const commentsRouter = Router()

commentsRouter.get('/:id', updateSession, commentsController.getCommentById.bind(commentsController))
commentsRouter.delete('/:id', checkJWT, updateSession, commentsController.deleteComment.bind(commentsController))
commentsRouter.put('/:id', checkJWT, commentValidation, inputCheckErrorsMiddleware, updateSession, commentsController.updateComment.bind(commentsController))
