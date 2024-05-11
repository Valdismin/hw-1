import {Router} from "express";
import {deleteComment, getCommentById, updateComment} from "./commentsController";
import {commentValidation} from "./commentsValidation";
import {inputCheckErrorsMiddleware} from "../../middlewares/createErrorMiddleware";
import {checkJWT} from "../../middlewares/checkJWT";
import {updateSession} from "../../middlewares/updateSession";

export const commentsRouter = Router()

commentsRouter.get('/:id', updateSession, getCommentById)
commentsRouter.delete('/:id', checkJWT, updateSession, deleteComment)
commentsRouter.put('/:id', checkJWT, commentValidation, inputCheckErrorsMiddleware, updateSession, updateComment)
