import {InputBlogType, OutputBlogType, UpdateBlogType} from "../types/blogsTypes";
import {db} from "../db/db";

export const blogsRepository = {
    async createBlog(blog: InputBlogType) {
        const newBlog = {
            id: `${Date.now() + Math.random()}`,
            ...blog
        }
        db.blogs.push(newBlog)
        return newBlog
    },
    async getBlogs(): Promise<OutputBlogType[]> {
        return db.blogs
    },
    async updateBlog(blog: UpdateBlogType, id: string) {
        const index = db.blogs.findIndex(b => b.id === id)
        if (index < 0) {
            return []
        }
        db.blogs[index] = {...db.blogs[index], ...blog};
        return db.blogs[index]
    },
    async deleteBlog(id: string) {
        const index = db.blogs.findIndex(b => b.id === id)
        if(index < 0) {
            return []
        }
        return db.blogs.slice(index, 1)
    },
    async findBlogById(id: string) {
        return db.blogs.find(b => b.id === id)
    },
}
