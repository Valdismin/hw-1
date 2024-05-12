import {Request, Response} from "express";
import {CommentsService} from "./commentsService";
import {CommentsQueryRepository} from "./commentsQueryRepository";
import {Schema} from "mongoose";

export class CommentsController {
    constructor(protected commentsService: CommentsService, protected commentsQueryRepository: CommentsQueryRepository) {
    }

    async getCommentById(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const comment = await this.commentsQueryRepository.getCommentById(id)
        if (!comment) {
            return res.status(404).json({message: "Comment not found"})
        }
        return res.status(200).json(comment)
    }

    async deleteComment(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const comment = await this.commentsQueryRepository.getCommentById(id)
        if (!comment) {
            res
                .status(404).end()
            return
        }
        if (comment.commentatorInfo.userId !== req.userId) {
            res
                .status(403).end()
            return
        }
        const result = await this.commentsService.deleteComment(id)
        if (!result) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }

    async updateComment(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const comment = await this.commentsQueryRepository.getCommentById(id)
        if (!comment) {
            res
                .status(404).end()
            return
        }
        if (comment.commentatorInfo.userId !== req.userId) {
            res
                .status(403).end()
            return
        }
        const result = await this.commentsService.updateComment(id, req.body.content)
        if (!result) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }
}
