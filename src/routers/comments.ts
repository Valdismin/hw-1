import {Router} from "express";

export const commentsRouter = Router()

commentsRouter.get('/', getCommentsController)
commentsRouter.put('/', createCommentController)
