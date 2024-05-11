import {BlogDBType, InputBlogType} from "./blogsTypes";
import {BlogsRepository} from "./blogsRepository";
import {ObjectId} from "mongoose";

export class BlogService {
    constructor(protected blogsRepository: BlogsRepository) {
    }

    createBlogService(blog: InputBlogType) {
        const newBlog = {
            createdAt: new Date().toISOString(),
            isMembership: false,
            ...blog
        }
        return this.blogsRepository.createBlog(newBlog)
    }

    async deleteBlogService(id: ObjectId): Promise<BlogDBType[]> {
        return await this.blogsRepository.deleteBlog(id)
    }

    async updateBlogService(blog: InputBlogType, id: ObjectId): Promise<BlogDBType[]> {
        return await this.blogsRepository.updateBlog(blog, id)
    }

}
