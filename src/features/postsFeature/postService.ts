import {InputForBlogsPostType, InputPostType, UpdatePostType} from "./postsTypes";
import {BlogDBType, BlogViewModelType} from "../blogFeature/blogsTypes";
import {PostsRepository} from "./postsRepository";
import {BlogsRepository} from "../blogFeature/blogsRepository";
import {ObjectId} from "mongoose";
import {inject, injectable} from "inversify";
import {UsersQueryRepository} from "../usersFeature/usersQueryRepository";

@injectable()
export class PostService {
    constructor(@inject(PostsRepository) protected postsRepository: PostsRepository,
                @inject(BlogsRepository)  protected blogsRepository: BlogsRepository,
                @inject(UsersQueryRepository) protected usersQueryRepository: UsersQueryRepository
                ) {
    }

    async createPostService(post: InputPostType): Promise<string> {
        const blog = await this.blogsRepository.getBlogById(post.blogId)
        const newPost = {
            blogName: blog?.name || '',
            createdAt: new Date().toISOString(),
            ...post
        }
        return this.postsRepository.createPost(newPost)
    }

    createPostForBlogService(post: InputForBlogsPostType, blog: BlogViewModelType | null) {
        const newPost = {
            blogName: blog!.name || '',
            blogId: blog!.id,
            createdAt: new Date().toISOString(),
            ...post
        }
        return this.postsRepository.createPost(newPost)
    }

    async deletePostService(id: string) {
        return await this.postsRepository.deletePost(id)
    }

    async updatePostService(post: UpdatePostType, id: string) {
        return await this.postsRepository.updatePost(post, id)
    }

    async addLikeService(postId: string, userId: string, likeStatus: string) {
        const checkResult = await this.postsRepository.checkUserLike(postId, userId)
        const user = await this.usersQueryRepository.getUserById(userId)
        if(checkResult) {
            return this.postsRepository.updateLikeToPost(postId, userId, likeStatus, user!.userInfo.login)
        }
        return this.postsRepository.addLikeToPost(postId, userId, likeStatus, user!.userInfo.login)
    }
}
