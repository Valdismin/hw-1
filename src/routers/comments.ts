import {Router} from "express";
import {deleteComment, getCommentById, updateComment} from "../controllers/commentsController";
import {commentValidation} from "../validation/comments";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";
import {checkJWT} from "../middlewares/checkJWT";

export const commentsRouter = Router()

commentsRouter.get('/:id', getCommentById)
commentsRouter.delete('/:id', checkJWT, deleteComment)
commentsRouter.put('/:id', commentValidation, inputCheckErrorsMiddleware, checkJWT, updateComment)
