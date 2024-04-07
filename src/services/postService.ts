import {InputForBlogsPostType, InputPostType, UpdatePostType} from "../types/postsTypes";
import {OutputBlogType} from "../types/blogsTypes";
import {postsRepository} from "../repositories/postsRepository";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {postCollection} from "../db/mongo-db";

export const postService = {
    createPostService: async (post: InputPostType) => {
        const blog = await blogsQueryRepository.getBlogById(post.blogId)
        const newPost = {
            blogName: blog?.name || '',
            id: `${Date.now() + Math.random()}`,
            createdAt: new Date().toISOString(),
            ...post
        }
        return postsRepository.createPost(newPost)
    },
    createPostForBlogService: (post: InputForBlogsPostType, blog: OutputBlogType | null) => {
        const newPost = {
            blogName: blog?.name || '',
            blogId: blog?.id || '',
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
    },
    createPostCommentService: async (postId: string, commentId: string) => {

    }
}
