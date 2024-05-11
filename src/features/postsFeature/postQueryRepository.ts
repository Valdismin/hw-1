import {OutputPaginatedPostType, PostDBType, PostModel} from "./postsTypes";
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

    async getPostById(id: ObjectId):Promise<PostDBType | null> {
        return PostModel.findOne({_id: id})
    }
}
