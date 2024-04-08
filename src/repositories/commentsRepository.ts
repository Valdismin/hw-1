import {commentsCollection} from "../db/mongo-db";

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
    }
}
