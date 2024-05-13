import {OutputPaginatedPostType, PostModel, PostViewModelType} from "./postsTypes";
import {ObjectId} from "mongoose";

export class PostsQueryRepository {
    async getPosts() {
        return PostModel.find({})
    }

    async getManyPosts(query: any, blogId: ObjectId): Promise<OutputPaginatedPostType | undefined> {
        const id = blogId ? {blogId: blogId} : {}
        try {
            const items: any = await PostModel.find(id).sort({[query.sortBy]: query.sortDirection})
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)

            const c = await PostModel.countDocuments(id).exec()

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

    async getPostById(id: string):Promise<PostViewModelType | null> {
        const post = await PostModel.findOne({_id: id}).exec()

        if (!post) {
            return null
        }

        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    }
}
