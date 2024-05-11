import {BlogDBType, InputBlogType} from "./blogsTypes";
import {blogsRepository} from "./blogsRepository";
import {ObjectId} from "mongoose";

export class BlogService {
    createBlogService(blog:InputBlogType) {
        const newBlog = {
            createdAt: new Date().toISOString(),
            isMembership: false,
            ...blog
        }
        return blogsRepository.createBlog(newBlog)
    }
    async deleteBlogService(id: ObjectId): Promise<BlogDBType[]> {
        return await blogsRepository.deleteBlog(id)
    }
    async updateBlogService(blog: InputBlogType, id: ObjectId): Promise<BlogDBType[]> {
        return await blogsRepository.updateBlog(blog, id)
    }

}
