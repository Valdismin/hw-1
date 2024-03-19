import {InputPostType, UpdatePostType} from "../types/postsTypes";
import {blogsRepository} from "./blogsRepository";
import {db, postCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const postsRepository = {
    async getPosts() {
        return postCollection.find({}).toArray()
    },
    async createPost(post: InputPostType) {
        const blog = await blogsRepository.findBlogById(new ObjectId(post.blogId))
        const newPost = {
            blogName: blog?.name || '',
            ...post
        }
        await postCollection.insertOne(newPost)
        return newPost
    },
    async getPostById(id: ObjectId) {
        const post = await postCollection.findOne({_id: id})
        if (!post) {
            return []
        }
        return post
    },
    async updatePost(post: UpdatePostType, id: string): Promise<any> {
        const updatedPost = await postCollection.updateOne({_id: new ObjectId(id)}, {$set: post})
        if (updatedPost.modifiedCount === 0) {
            return []
        }
        return updatedPost
    },
    async deletePost(id: ObjectId) {
        const deletedPost = await postCollection.findOne({_id: id})
        const result = await postCollection.deleteOne({_id: id})
        console.debug('result', result)
        if (result.deletedCount === 0) {
            return []
        }
        return [deletedPost]
    }
}
