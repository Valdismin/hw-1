import {UsersRepository} from "../usersFeature/usersRepository";
import {ObjectId} from "mongoose";
import {CommentsRepository} from "./commentsRepository";

export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository, protected usersRepository: UsersRepository) {
    }
    async createPostCommentService(postId: ObjectId, comment: string, token: string, userId: ObjectId) {
        const user = await this.usersRepository.getUserById(userId)
        if (!user) {
            return null
        }
        const newComment = {
            content: comment,
            createdAt: new Date().toISOString(),
            commentatorInfo: {
                userId: user._id,
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

    async addLikeToComment(commentId: ObjectId, userId: ObjectId, likeStatus: string) {
        const checkResult = await this.commentsRepository.checkUserLike(commentId, userId)
        if(checkResult) {
            return this.commentsRepository.updateLikeToComment(commentId, userId, likeStatus)
        }
        return this.commentsRepository.addLikeToComment(commentId, userId, likeStatus)
    }
}
