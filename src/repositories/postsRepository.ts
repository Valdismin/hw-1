import {InputPostType, OutputPostType, PostDBType, UpdatePostType} from "../types/postsTypes";
import {blogsRepository} from "./blogsRepository";
import {postCollection} from "../db/mongo-db";

export const postsRepository = {
    async getPosts(): Promise<OutputPostType[]> {
        return postCollection.find({}, { projection: { _id: 0 } }).toArray()
    },
    async createPost(post: InputPostType): Promise<OutputPostType | null> {
        const blog = await blogsRepository.findBlogById(post.blogId)
        const newPost = {
            blogName: blog?.name || '',
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
        await postCollection.insertOne(newPost)
        return await postCollection.findOne({id: newPost.id}, {projection: {_id: 0}})
    },
    async getPostById(id: string): Promise<OutputPostType | null> {
        const post = await postCollection.findOne({id: id}, { projection: { _id: 0 } })
        if (!post) {
            return null
        }
        return post
    },
    async updatePost(post: UpdatePostType, id: string): PostDBType | null {
        const updatedPost = await postCollection.updateOne({id:id}, {$set: {...post}})
        if (updatedPost.modifiedCount === 0) {
            return null
        }
        return updatedPost
    },
    async deletePost(id: string): Promise<PostDBType[] | null> {
        const result = await postCollection.deleteOne({id: id})

        if (result.deletedCount === 0) {
            return null
        }
        return postCollection.find({id: id}, { projection: { _id: 0 } }).toArray()
    }
}
