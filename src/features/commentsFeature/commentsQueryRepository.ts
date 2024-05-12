import {
    CommentModel, CommentsDBType,
    LikesAndDislikesType,
    LikeStatus,
    OutputCommentType,
    OutputPaginatedCommentsType
} from "./commentsTypes";
import {ObjectId} from "mongoose";

export class CommentsQueryRepository {
    async getPostComments(postId: ObjectId, query: any, userId?: ObjectId): Promise<OutputPaginatedCommentsType | undefined> {

        try {
            const items: any = await CommentModel.find({postId}).sort({[query.sortBy]: query.sortDirection})
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)

            const sanitizedItems = items.map((item: CommentsDBType) => {
                const likesCount = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Like).length
                const dislikesCount = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Dislike).length
                const myStatus = item.likes.find((like: LikesAndDislikesType) => like.userId === userId)?.likeStatus || LikeStatus.None

                return {
                    id: item._id,
                    content: item.content,
                    commentatorInfo: item.commentatorInfo,
                    createdAt: item.createdAt,
                    likesInfo: {
                        likesCount,
                        dislikesCount,
                        myStatus
                    }
                }
            })


            const c = await CommentModel.countDocuments({postId}).exec()

            return {
                items: sanitizedItems,
                totalCount: c,
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize
            }
        } catch (e) {
            return undefined
        }
    }

    async getCommentById(id: ObjectId, userId?: ObjectId): Promise<OutputCommentType | null> {
        const comment = await CommentModel.findOne({_id: id}).lean().exec()

        if (!comment) {
            return null
        }


        const likesCount = await CommentModel.countDocuments({"likes.likeStatus": LikeStatus.Like}).where("likes.likesStatus").lean().exec()
        const dislikesCount = await CommentModel.countDocuments({"likes.likeStatus": LikeStatus.Dislike}).where("likes.likesStatus").lean().exec()
        const userStatus = await CommentModel.findOne({_id: id, likes: {$elemMatch: {userId: userId}}}).lean().exec()

        return {
            id: comment._id,
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount,
                dislikesCount: dislikesCount,
                myStatus: userStatus?.likes[0].likeStatus || LikeStatus.None
            }
        }
    }
}
