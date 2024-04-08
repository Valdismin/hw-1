import {Router} from "express";
import {deleteComment, getCommentById, updateComment} from "../controllers/commentsController";
import {authMiddleware} from "../middlewares/auth";
import {commentValidation} from "../validation/comments";
import {inputCheckErrorsMiddleware} from "../middlewares/createErrorMiddleware";

export const commentsRouter = Router()

commentsRouter.get('/:id', getCommentById)
commentsRouter.delete('/:id', authMiddleware, deleteComment)
commentsRouter.put('/:id', commentValidation, inputCheckErrorsMiddleware, authMiddleware, updateComment)
