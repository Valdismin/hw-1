import {postCollection} from "../../db/mongo-db";
import {OutputPaginatedPostType} from "./postsTypes";
import {ObjectId} from "mongoose";

export const postQueryRepository = {
    async getPosts() {
        return await postCollection.find({}).project({_id: 0}).toArray()
    },
    async getManyPosts(query: any, blogId: ObjectId): Promise<OutputPaginatedPostType | undefined> {
        const id = blogId ? {blogId: blogId} : {}
        try {
            const items: any = await postCollection.find(id).project({_id: 0}).sort(
                query.sortBy,
                query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray()

            const c = await postCollection.countDocuments(id)

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
    getPostById: async (id: string) => {
        const post = await postCollection.findOne({id: id}, {projection: {_id: 0}})
        if (!post) {
            return null
        }
        return post
    }
}
