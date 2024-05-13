import {CommentInputType, CommentModel} from "./commentsTypes";

export class CommentsRepository {
    async createComment(dto: CommentInputType): Promise<string>  {
        const comment = new CommentModel(dto)
        const result = await comment.save()
        return result._id.toString()
    }
    async deleteComment(id: string): Promise<boolean | null> {
       const result: any = await CommentModel.deleteOne({_id:id})
        if (result.deletedCount === 0) {
            return null
        }
        return true
    }
    async updateComment(id: string, comment: string): Promise<boolean | null> {
        const result: any = await CommentModel.updateOne({_id:id}, {$set: {content: comment}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }
    async addLikeToComment(commentId: string,userId: string, likeStatus: string): Promise<boolean | null> {
        const result: any =  await CommentModel.updateOne({_id: commentId}, {$push: {likes: {likeStatus: likeStatus, userId: userId}}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }

    async updateLikeToComment(commentId: string,userId: string, likeStatus: string): Promise<boolean | null> {
        const result: any =  await CommentModel.updateOne({_id: commentId, "likes.userId": userId}, {$set: {likes: {likeStatus: likeStatus, userId: userId}}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }

    async checkUserLike(commentId: string, userId: string): Promise<boolean> {
        const comment = await CommentModel.findOne({_id: commentId, likes: {$elemMatch: {userId: userId}}})
        return !!comment
    }
    async checkComment(commentId: string): Promise<boolean> {
        const comment = await CommentModel.findOne({_id: commentId})
        return !!comment
    }
}
