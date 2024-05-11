import {InputForBlogsPostType, InputPostType, UpdatePostType} from "./postsTypes";
import {BlogDBType, OutputBlogType} from "../blogFeature/blogsTypes";
import {postsRepository} from "./postsRepository";
import {blogsRepository} from "../blogFeature/blogsRepository";
import mongoose, {Schema} from "mongoose";

export const postService = {
    createPostService: async (post: InputPostType) => {
        const blog = await blogsRepository.getBlogById(post.blogId)
        const newPost = {
            blogName: blog?.name || '',
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
        return postsRepository.createPost(newPost)
    },
    createPostForBlogService: (post: InputForBlogsPostType, blog: BlogDBType | null) => {
        const newPost = {
            blogName: blog?.name || '',
            blogId: blog?._id,
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
        return postsRepository.createPostForBlog(newPost)
    },
    deletePostService: async (id: string) => {
        return await postsRepository.deletePost(id)
    },
    updatePostService: async (post: UpdatePostType, id: string) => {
        return await postsRepository.updatePost(post, id)
    }
}
