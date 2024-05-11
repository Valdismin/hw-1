import {OutputPostType, PostDBType, UpdatePostType} from "./postsTypes";
import {postCollection} from "../../db/mongo-db";

export const postsRepository = {
    async createPost(post: PostDBType): Promise<OutputPostType | null> {

        await postCollection.insertOne(post)
        return await postCollection.findOne({id: post.id}, {projection: {_id: 0}})
    },
    async createPostForBlog(post: PostDBType): Promise<OutputPostType | null> {
        await postCollection.insertOne(post)
        return await postCollection.findOne({id: post.id}, {projection: {_id: 0}})
    },
    async updatePost(post: UpdatePostType, id: string): Promise<boolean | null> {
        const updatedPost = await postCollection.updateOne({id: id}, {$set: {...post}})
        if (updatedPost.modifiedCount === 0) {
            return null
        }
        return true
    },
    async deletePost(id: string): Promise<PostDBType[] | null> {
        const result = await postCollection.deleteOne({id: id})

        if (result.deletedCount === 0) {
            return null
        }
        return postCollection.find({id: id}, {projection: {_id: 0}}).toArray()
    }
}
