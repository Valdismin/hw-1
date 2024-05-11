import {commentsCollection} from "../../db/mongo-db";
import {ObjectId} from "mongodb";
import {OutputCommentType} from "./commentsTypes";

export const commentsRepository = {
    createComment: async (comment: any) => {
        return commentsCollection.insertOne(comment)
    },
    deleteComment: async (id: string): Promise<boolean | null> => {
       const result = await commentsCollection.deleteOne({id})
        if (result.deletedCount === 0) {
            return null
        }
        return true
    },
    updateComment: async (id: string, comment: string): Promise<boolean | null> => {
        const result = await commentsCollection.updateOne({id}, {$set: {content: comment}})
        if (result.modifiedCount === 0) {
            return null
        }
        return true
    },
    getCommentByDBId: async (id: ObjectId): Promise<OutputCommentType | null> => {
        const comment = await commentsCollection.findOne({_id: id}, {projection: {_id: 0, acknowledged: 0, insertedId: 0, postId: 0}})
        if (!comment) {
            return null
        }
        return comment
    }
}
