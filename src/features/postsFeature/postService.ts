import {InputForBlogsPostType, InputPostType, UpdatePostType} from "./postsTypes";
import {BlogDBType} from "../blogFeature/blogsTypes";
import {PostsRepository} from "./postsRepository";
import {BlogsRepository} from "../blogFeature/blogsRepository";
import {ObjectId} from "mongoose";

export class PostService {
    constructor(protected postsRepository: PostsRepository, protected blogsRepository: BlogsRepository) {
    }

    async createPostService(post: InputPostType) {
        const blog = await this.blogsRepository.getBlogById(post.blogId)
        const newPost = {
            blogName: blog?.name || '',
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
        return this.postsRepository.createPost(newPost)
    }

    createPostForBlogService(post: InputForBlogsPostType, blog: BlogDBType | null) {
        const newPost = {
            blogName: blog?.name || '',
            blogId: blog?._id,
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
        return this.postsRepository.createPost(newPost)
    }

    async deletePostService(id: ObjectId) {
        return await this.postsRepository.deletePost(id)
    }

    async updatePostService(post: UpdatePostType, id: ObjectId) {
        return await this.postsRepository.updatePost(post, id)
    }
}
