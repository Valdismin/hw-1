import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {JWTService} from "./JWTService";
import {commentsRepository} from "../repositories/commentsRepository";

export const commentsService = {
    createPostCommentService: async (postId: string, comment: string, token: string, userId: string) => {
        console.debug(userId)
        const user = await usersQueryRepository.getUserById(userId)
        if (!user) {
            return null
        }
        const newComment = {
            id: `${Date.now() + Math.random()}`,
            content: comment,
            createdAt: new Date().toISOString(),
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            postId: postId
        }
        return commentsRepository.createComment(newComment)
    },
    deleteComment: async (id: string) => {
        return commentsRepository.deleteComment(id)
    },
    updateComment: async (id: string, comment: string) => {
        return commentsRepository.updateComment(id, comment)
    }
}
