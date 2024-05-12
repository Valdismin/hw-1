import {Request, Response} from "express";
import {CommentsService} from "./commentsService";
import {CommentsQueryRepository} from "./commentsQueryRepository";
import {Schema} from "mongoose";
import {JWTService} from "../authFeature/JWTService";


export class CommentsController {
    constructor(protected commentsService: CommentsService,
                protected commentsQueryRepository: CommentsQueryRepository,
                protected JWTService: JWTService) {
    }

    async getCommentById(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        let token
        let userId
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]
            userId = await this.JWTService.getUserIdByToken(token)
        }
        const comment = await this.commentsQueryRepository.getCommentById(id, userId)
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

    async addLikeToComment(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        //@ts-ignore
        const userId = req.userId as Schema.Types.ObjectId
        const result = await this.commentsService.addLikeToComment(id, userId, req.body.likeStatus)

        if (!result) {
            res
                .status(404).end()
            return
        }

        res.status(204).end()
    }

}
