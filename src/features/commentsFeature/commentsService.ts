import {UsersRepository} from "../usersFeature/usersRepository";
import {CommentsRepository} from "./commentsRepository";
import {UsersQueryRepository} from "../usersFeature/usersQueryRepository";

export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository,
                protected usersRepository: UsersRepository,
                protected usersQueryRepository: UsersQueryRepository) {
    }
    async createPostCommentService(postId: string, comment: string, token: string, userId: string) {
        const user = await this.usersQueryRepository.getUserById(userId)
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

    async deleteComment(id: string) {
        return this.commentsRepository.deleteComment(id)
    }

    async updateComment(id: string, comment: string) {
        return this.commentsRepository.updateComment(id, comment)
    }

    async addLikeToComment(commentId: string, userId: string, likeStatus: string) {
        const checkComment = await this.commentsRepository.checkComment(commentId)
        if (!checkComment) {
            return null
        }
        const checkResult = await this.commentsRepository.checkUserLike(commentId, userId)
        if(checkResult) {
            return this.commentsRepository.updateLikeToComment(commentId, userId, likeStatus)
        }
        return this.commentsRepository.addLikeToComment(commentId, userId, likeStatus)
    }
}
