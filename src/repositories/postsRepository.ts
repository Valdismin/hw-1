import {InputForBlogsPostType, InputPostType, OutputPostType, PostDBType, UpdatePostType} from "../types/postsTypes";
import {blogsRepository} from "./blogsRepository";
import {postCollection} from "../db/mongo-db";
import {blogsQueryRepository} from "./blogsQueryRepository";
import {OutputBlogType} from "../types/blogsTypes";
import {postService} from "../services/postService";

export const postsRepository = {
    async createPost(post: InputPostType): Promise<OutputPostType | null> {
        const blog = await blogsQueryRepository.getBlogById(post.blogId)
       const newPost = postService.createPostService(post, blog)
        await postCollection.insertOne(newPost)
        return await postCollection.findOne({id: newPost.id}, {projection: {_id: 0}})
    },
    async createPostForBlog(post: InputForBlogsPostType, blog: OutputBlogType): Promise<OutputPostType | null> {
        const newPost = postService.createPostForBlogService(post, blog)
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
    async updatePost(post: UpdatePostType, id: string): Promise<boolean | null> {
        const updatedPost = await postCollection.updateOne({id:id}, {$set: {...post}})
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
        return postCollection.find({id: id}, { projection: { _id: 0 } }).toArray()
    }
}
