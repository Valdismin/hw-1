import {commentsRepository} from "./commentsRepository";
import {usersRepository} from "../usersFeature/usersRepository";
import {ObjectId} from "mongoose";

export const commentsService = {
    createPostCommentService: async (postId: ObjectId, comment: string, token: string, userId: string) => {
        const user = await usersRepository.getUserById(userId)
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
        return await commentsRepository.getCommentByDBId(createdCommentResult.insertedId)
    },
    deleteComment: async (id: string) => {
        return commentsRepository.deleteComment(id)
    },
    updateComment: async (id: string, comment: string) => {
        return commentsRepository.updateComment(id, comment)
    }
}
