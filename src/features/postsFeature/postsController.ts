import {Request, Response} from 'express'
import {OutputPaginatedPostType, PostDBType} from "./postsTypes";
import {queryHelper} from "../../utils/helpers";
import {PostsQueryRepository} from "./postQueryRepository";
import {Schema} from "mongoose";
import {PostService} from "./postService";
import {BlogsQueryRepository} from "../blogFeature/blogsQueryRepository";
import {CommentsService} from "../commentsFeature/commentsService";
import {CommentsQueryRepository} from "../commentsFeature/commentsQueryRepository";
import {JWTService} from "../authFeature/JWTService";

export class PostsController {
    constructor(protected postService: PostService,
                protected blogsQueryRepository: BlogsQueryRepository,
                protected postQueryRepository: PostsQueryRepository,
                protected commentsService: CommentsService,
                protected commentsQueryRepository: CommentsQueryRepository,
                protected JWTService: JWTService
    ) {
    }

    async getPosts(req: Request, res: Response<OutputPaginatedPostType | undefined>) {
        const sanitizedQuery = queryHelper(req.query)
        if (req.params.blogId) {
            //@ts-ignore
            //TODO: ask at the lesson
            const id = req.params.blogId as Schema.Types.ObjectId
            const blog = await this.blogsQueryRepository.getBlogById(id)
            if (!blog) {
                res.status(404).end()
                return
            }
        }
        //@ts-ignore
        //TODO: ask at the lesson
        const id = req.params.blogId as Schema.Types.ObjectId
        const posts = await this.postQueryRepository.getManyPosts(sanitizedQuery, id)
        if (!posts) {
            res.status(404).end()
            return
        }
        res.status(200).json(posts)
    }

    async createPost(req: Request, res: Response<PostDBType>) {
        const post = await this.postService.createPostService(req.body)

        res.status(201).json(post as PostDBType)
    }

    async createPostForBlog(req: Request, res: Response<PostDBType>) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.blogId as Schema.Types.ObjectId
        const blog = await this.blogsQueryRepository.getBlogById(id)
        if (!blog) {
            res.status(404).end()
            return
        }

        const post = await this.postService.createPostForBlogService(req.body, blog)

        res.status(201).json(post as PostDBType)
    }

    async getPostById(req: Request, res: Response<PostDBType>) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const post = await this.postQueryRepository.getPostById(id)
        if (!post) {
            res.status(404).end()
            return
        }

        res.status(200).json(post)
    }

    async updatePost(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const updatedPost = await this.postService.updatePostService(req.body, id)
        if (!updatedPost) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }

    async deletePost(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const deletedPost = await this.postService.deletePostService(id)
        if (!deletedPost) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }

    async getPostComments(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const post = await this.postQueryRepository.getPostById(id)
        if (!post) {
            res.status(404).end()
            return
        }
        const sanitizedQuery = queryHelper(req.query)

        let token
        let userId
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1]
            userId = await this.JWTService.getUserIdByToken(token)
        }



        const comments = await this.commentsQueryRepository.getPostComments(id, sanitizedQuery, userId)
        if (!comments) {
            res.status(404).end()
            return
        }
        res.status(200).json(comments)
    }

    async createPostComment(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        //@ts-ignore
        const userId = req.userId as Schema.Types.ObjectId
        const post = await this.postQueryRepository.getPostById(id)
        if (!post) {
            res.status(404).end()
            return
        }
        const comments = await this.commentsService.createPostCommentService(id, req.body.content, req.headers.authorization as string, userId)
        if (!comments) {
            res.status(404).end()
            return
        }
        res.status(201).json(comments)
    }
}
