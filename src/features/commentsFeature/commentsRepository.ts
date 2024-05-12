import {ObjectId} from "mongoose";
import {CommentInputType, CommentModel, OutputCommentType} from "./commentsTypes";

export class CommentsRepository {
    async createComment(dto: CommentInputType): Promise<OutputCommentType | null>  {
        const comment = new CommentModel(dto)
        return await comment.save()
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
    async getCommentByDBId(id: ObjectId): Promise<OutputCommentType | null> {
        const comment = await CommentModel.findOne({_id: id})
        if (!comment) {
            return null
        }
        return comment
    }
}
