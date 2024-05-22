import {LikesAndDislikesType, LikeStatus, OutputPaginatedPostType, PostModel, PostViewModelType} from "./postsTypes";
import {injectable} from "inversify";

@injectable()
export class PostsQueryRepository {
    async getManyPosts(query: any, blogId: string, userId?: string): Promise<OutputPaginatedPostType | undefined> {
        const id = blogId ? {blogId: blogId} : {}
        try {
            const items: any = await PostModel.find(id).sort({[query.sortBy]: query.sortDirection})
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)

            const c = await PostModel.countDocuments(id).exec()

            const sanitizedItems = items.map((item: any) => {
                const likesCount = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Like).length
                const dislikesCount = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Dislike).length
                const myStatus = item.likes.find((like: LikesAndDislikesType) => like.userId === userId)?.likeStatus || LikeStatus.None
                const newestLikes = item.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Like)
                    .sort((a: LikesAndDislikesType, b: LikesAndDislikesType) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    }).slice(0, 3)
                    .map((like: LikesAndDislikesType) => {
                        return {
                            addedAt: like.createdAt,
                            userId: like.userId,
                            login: like.userLogin
                        }
                    })
                return {
                    id: item._id,
                    title: item.title,
                    shortDescription: item.shortDescription,
                    content: item.content,
                    blogId: item.blogId,
                    blogName: item.blogName,
                    createdAt: item.createdAt,
                    extendedLikesInfo: {
                        likesCount,
                        dislikesCount,
                        myStatus,
                        newestLikes: newestLikes
                    }
                }
            })


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

    async getPostById(id: string, userId?: string): Promise<PostViewModelType | null> {
        const post = await PostModel.findOne({_id: id}).lean().exec()
        if (!post) {
            return null
        }

        const postLikeStatus = await PostModel.findOne({_id: id, likes: {$elemMatch: {userId: userId}}}).lean().exec()
        const likesCount = post.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Like).length
        const dislikesCount = post.likes.filter((like: LikesAndDislikesType) => like.likeStatus === LikeStatus.Dislike).length
        const newestLikes = post.likes.filter((like) => like.likeStatus === LikeStatus.Like).sort((a: LikesAndDislikesType, b: LikesAndDislikesType) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }).slice(0, 3).map((like: LikesAndDislikesType) => {
            return {
                addedAt: like.createdAt,
                userId: like.userId,
                login: like.userLogin
            }
        })

        if (!userId || !postLikeStatus) {
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
                extendedLikesInfo: {
                    likesCount: likesCount,
                    dislikesCount: dislikesCount,
                    myStatus: LikeStatus.None,
                    newestLikes: newestLikes
                }
            }
        }


        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount: likesCount,
                dislikesCount: dislikesCount,
                myStatus: postLikeStatus.likes[0].likeStatus,
                newestLikes: newestLikes
            }
        }
    }
}
