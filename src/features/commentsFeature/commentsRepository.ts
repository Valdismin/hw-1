import {ObjectId} from "mongoose";
import {CommentInputType, CommentModel, LikeStatus, OutputCommentType} from "./commentsTypes";

export class CommentsRepository {
    async createComment(dto: CommentInputType): Promise<OutputCommentType | null>  {
        const comment = new CommentModel(dto)
        const result = await comment.save()
        return {
            id: result._id,
            content: result.content,
            createdAt: result.createdAt,
            commentatorInfo: result.commentatorInfo,
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: LikeStatus.None
            }
        }
    }
    async deleteComment(id: ObjectId): Promise<boolean | null> {
       const result: any = await CommentModel.deleteOne({_id:id})
        if (result.deletedCount === 0) {
            return null
        }
        return true
    }
    async updateComment(id: ObjectId, comment: string): Promise<boolean | null> {
        const result: any = await CommentModel.updateOne({_id:id}, {$set: {content: comment}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }
    async addLikeToComment(commentId: ObjectId,userId: ObjectId, likeStatus: string): Promise<boolean | null> {
        const result: any =  await CommentModel.updateOne({_id: commentId}, {$push: {likes: {likeStatus: likeStatus, userId: userId}}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }

    async updateLikeToComment(commentId: ObjectId,userId: ObjectId, likeStatus: string): Promise<boolean | null> {
        const result: any =  await CommentModel.updateOne({_id: commentId, "likes.userId": userId}, {$set: {likes: {likeStatus: likeStatus}}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }

    async checkUserLike(commentId: ObjectId, userId: ObjectId): Promise<boolean> {
        const comment = await CommentModel.findOne({_id: commentId, likes: {$elemMatch: {userId: userId}}})
        return !!comment
    }
}
