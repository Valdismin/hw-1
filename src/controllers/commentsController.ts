import {Request, Response} from "express";
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";
import {commentsService} from "../services/commentsService";

export const getCommentById = async (req: Request, res: Response) => {
    const id = req.params.id
    const comment = await commentsQueryRepository.getCommentById(id)
    if (!comment) {
        return res.status(404).json({message: "Comment not found"})
    }
    return res.status(200).json(comment)
}

export const deleteComment = async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await commentsService.deleteComment(id)
    if (!result) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}
export const updateComment = async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await commentsService.updateComment(id, req.body.content)
    if (!result) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}
