import {InputForBlogsPostType, InputPostType} from "../types/postsTypes";
import {OutputBlogType} from "../types/blogsTypes";

export const postService = {
    createPostService: (post: InputPostType, blog: OutputBlogType | null) => {
        return {
            blogName: blog?.name || '',
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
    },
    createPostForBlogService: (post: InputForBlogsPostType, blog: OutputBlogType | null) => {
        return {
            blogName: blog?.name || '',
            blogId: blog?.id || '',
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
    }
}
