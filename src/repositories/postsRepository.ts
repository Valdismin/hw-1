import {db} from "../db/db";
import {InputPostType, UpdatePostType} from "../types/postsTypes";
import {blogsRepository} from "./blogsRepository";
import {UpdateBlogType} from "../types/blogsTypes";

export const postsRepository = {
    async getPosts() {
        return db.posts
    },
    async createPost(post: InputPostType) {
        const blog = await blogsRepository.findBlogById(post.blogId)
        const newPost = {
            id: `${Date.now() + Math.random()}`,
            blogName: blog?.name || '',
            ...post
        }
        db.posts.push(newPost)
        return newPost
    },
    async getPostById(id: string) {
        const post = db.posts.find(p => p.id === id)
        if (!post) {
            return []
        }
        return post
    },
    async updatePost(post: UpdatePostType, id: string) {
        const index = db.posts.findIndex(b => b.id === id)
        if (index < 0) {
            return []
        }
        db.posts[index] = {...db.posts[index], ...post};
        return db.posts[index]
    },
    async deletePost(id: string) {
        const index = db.posts.findIndex(b => b.id === id)
        if(index < 0) {
            return []
        }
        return db.posts.splice(index, 1)
    }
}
