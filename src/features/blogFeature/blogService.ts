import {BlogDBType, InputBlogType} from "./blogsTypes";
import {BlogsRepository} from "./blogsRepository";
import {ObjectId} from "mongoose";

export class BlogService {
    constructor(protected blogsRepository: BlogsRepository) {
    }

   async createBlogService(blog: InputBlogType): Promise<string> {
        const newBlog = {
            createdAt: new Date().toISOString(),
            isMembership: false,
            ...blog
        }
        const createdBlogId = await this.blogsRepository.createBlog(newBlog)

       return createdBlogId.toString()
    }

    async deleteBlogService(id: ObjectId): Promise<BlogDBType[]> {
        return await this.blogsRepository.deleteBlog(id)
    }

    async updateBlogService(blog: InputBlogType, id: ObjectId): Promise<BlogDBType[]> {
        return await this.blogsRepository.updateBlog(blog, id)
    }

}
