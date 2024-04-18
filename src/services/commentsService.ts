import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {commentsRepository} from "../repositories/commentsRepository";
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";

export const commentsService = {
    createPostCommentService: async (postId: string, comment: string, token: string, userId: string) => {
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
                userLogin: user.userInfo.login
            },
            postId: postId
        }
        const createdCommentResult = await commentsRepository.createComment(newComment)
        return await commentsQueryRepository.getCommentByDBId(createdCommentResult.insertedId)
    },
    deleteComment: async (id: string) => {
        return commentsRepository.deleteComment(id)
    },
    updateComment: async (id: string, comment: string) => {
        return commentsRepository.updateComment(id, comment)
    }
}
