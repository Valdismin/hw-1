import {usersRepository} from "../usersFeature/usersRepository";
import {ObjectId} from "mongoose";
import {CommentsRepository} from "./commentsRepository";

export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository) {
    }
    async createPostCommentService(postId: ObjectId, comment: string, token: string, userId: string) {
        const user = await usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        const newComment = {
            content: comment,
            createdAt: new Date().toISOString(),
            commentatorInfo: {
                userId: user.id,
                userLogin: user.userInfo.login
            },
            postId: postId
        }
        return await this.commentsRepository.createComment(newComment)
        //return await this.commentsRepository.getCommentByDBId(createdCommentResult.insertedId)
    }

    async deleteComment(id: ObjectId) {
        return this.commentsRepository.deleteComment(id)
    }

    async updateComment(id: ObjectId, comment: string) {
        return this.commentsRepository.updateComment(id, comment)
    }
}
