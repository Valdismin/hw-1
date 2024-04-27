import {commentsCollection, postCollection} from "../db/mongo-db";
import {OutputCommentType, OutputPaginatedCommentsType} from "../types/commentsTypes";
import {ObjectId} from "mongodb";

export const commentsQueryRepository = {
    getPostComments: async (postId: string, query: any): Promise<OutputPaginatedCommentsType | undefined> => {
        try {
            const items: any = await commentsCollection.find({postId}).project({_id: 0, postId: 0}).sort(
                query.sortBy,
                query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray()

            const c = await commentsCollection.countDocuments({postId})

            return {
                items,
                totalCount: c,
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize
            }
        } catch (e) {
            return undefined
        }
    },
    getCommentById: async (id: string): Promise<OutputCommentType | null> => {
        const comment = await commentsCollection.findOne({id: id}, {projection: {_id: 0, acknowledged: 0, insertedId: 0, postId: 0}})
        if (!comment) {
            return null
        }
        return comment
    }
}
