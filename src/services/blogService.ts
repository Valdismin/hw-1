import {InputBlogType, OutputBlogType} from "../types/blogsTypes";
import {blogsRepository} from "../repositories/blogsRepository";

export const blogService = {
    createBlogService: (blog:InputBlogType) => {
        const newBlog = {
            createdAt: new Date().toISOString(),
            isMembership: false,
            id: `${Date.now() + Math.random()}`,
            ...blog
        }
        return blogsRepository.createBlog(newBlog)
    },
    deleteBlogService: async(id: string): Promise<OutputBlogType[]> => {
        return await blogsRepository.deleteBlog(id)
    },
    updateBlogService: async(blog: InputBlogType, id: string): Promise<OutputBlogType[]> => {
        return await blogsRepository.updateBlog(blog, id)
    }

}
