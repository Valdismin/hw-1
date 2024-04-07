import {Request, Response} from "express";

export const getPostCommentsController = async (req: Request, res: Response) => {
    const comments = await commentsQueryRepository.getPostComments(req.params.id)
    if (!comments) {
        res.status(404).end()
        return
    }
    res.status(200).json(comments)
}

export const createPostCommentController = async (req: Request, res: Response) => {
    const comment = await commentsService.createPostCommentService(req.body, req.params.id)
    if (!comment) {
        res.status(404).end()
        return
    }
    res.status(201).end()
}
