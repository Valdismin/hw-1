import {
    CommentModel, CommentsDBType,
    LikesAndDislikesType,
    LikeStatus,
    OutputCommentType,
    OutputPaginatedCommentsType
} from "./commentsTypes";

export class CommentsQueryRepository {
    async getPostComments(postId: string, query: any, userId?: string): Promise<OutputPaginatedCommentsType | undefined> {

        try {
            const items: any = await CommentModel.find({postId}).sort({[query.sortBy]: query.sortDirection})
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)

            const sanitizedItems = items.map((item: CommentsDBType) => {
                const likesCount = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Like).length
                const dislikesCount = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Dislike).length
                const myStatus = item.likes.find((like: any) => like.userId === userId)?.likeStatus || LikeStatus.None

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

    async getCommentById(id: string, userId?: string): Promise<OutputCommentType | null> {
        const comment = await CommentModel.findOne({_id: id}).lean().exec()

        if (!comment) {
            return null
        }

        const commentLikeStatus = await CommentModel.findOne({_id: id, 'likes.userId': userId}).lean().exec()
        const likesCount = comment.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Like).length
        const dislikesCount = comment.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Dislike).length

        if (!userId || !commentLikeStatus) {
            return {
                id: comment._id.toString(),
                content: comment.content,
                commentatorInfo: comment.commentatorInfo,
                createdAt: comment.createdAt,
                likesInfo: {
                    likesCount: likesCount,
                    dislikesCount: dislikesCount,
                    myStatus: LikeStatus.None
                }
            }
        }

        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount,
                dislikesCount: dislikesCount,
                myStatus: commentLikeStatus.likes[0].likeStatus
            }
        }

    }
}
