import {CommentModel, OutputCommentType, OutputPaginatedCommentsType} from "./commentsTypes";
import {ObjectId} from "mongoose";

export class CommentsQueryRepository {
    async getPostComments (postId: ObjectId, query: any): Promise<OutputPaginatedCommentsType | undefined>  {
        try {
            const items: any = await CommentModel.find({postId}).sort({[query.sortBy]: query.sortDirection})
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)


            const c = await CommentModel.countDocuments({postId}).exec()

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
    }
    async getCommentById(id: ObjectId): Promise<OutputCommentType | null>  {
        const comment = await CommentModel.findOne({_id: id}, {
            projection: {
                acknowledged: 0,
                insertedId: 0,
                postId: 0
            }
        })
        if (!comment) {
            return null
        }
        return comment
    }
}
