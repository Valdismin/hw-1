import {InputBlogType} from "../types/blogsTypes";

export const blogService = {
    createBlogService: (blog:InputBlogType) => {
        return {
            createdAt: new Date().toISOString(),
            isMembership: false,
            id: `${Date.now() + Math.random()}`,
            ...blog
        }
    }
}
