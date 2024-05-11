import {Request, Response} from 'express'
import {postsRepository} from "./postsRepository";
import {OutputPaginatedPostType, OutputPostType} from "./postsTypes";
import {queryHelper} from "../../utils/helpers";
import {postQueryRepository} from "./postQueryRepository";
import {blogsQueryRepository} from "../blogFeature/blogsQueryRepository";
import {postService} from "./postService";
import {commentsQueryRepository} from "../commentsFeature/commentsQueryRepository";
import {commentsService} from "../commentsFeature/commentsService";
import {Schema} from "mongoose";

export const getPostsController = async (req: Request, res: Response<OutputPaginatedPostType | undefined>) => {
    const sanitizedQuery = queryHelper(req.query)
    if (req.params.blogId) {
        //@ts-ignore
        //TODO: ask at the lesson
        const id = req.params.blogId as Schema.Types.ObjectId
        const blog = await blogsQueryRepository.getBlogById(id)
        if (!blog) {
            res.status(404).end()
            return
        }
    }
    //@ts-ignore
    //TODO: ask at the lesson
    const id = req.params.blogId as Schema.Types.ObjectId
    const posts = await postQueryRepository.getManyPosts(sanitizedQuery, id)
    if (!posts) {
        res.status(404).end()
        return
    }
    res.status(200).json(posts)
}

export const createPostController = async (req: Request, res: Response<OutputPostType>) => {
    const post = await postService.createPostService(req.body)

    res.status(201).json(post as OutputPostType)
}

export const createPostForBlogController = async (req: Request, res: Response<OutputPostType>) => {
    //@ts-ignore
    //TODO: ask on the lesson
    const id = req.params.blogId as Schema.Types.ObjectId
    const blog = await blogsQueryRepository.getBlogById(id)
    if (!blog) {
        res.status(404).end()
        return
    }
    const post = await postService.createPostForBlogService(req.body, blog)

    res.status(201).json(post as OutputPostType)
}

export const getPostByIdController = async (req: Request, res: Response<OutputPostType>) => {
    const post = await postQueryRepository.getPostById(req.params.id)
    if (!post) {
        res.status(404).end()
        return
    }

    res.status(200).json(post)
}

export const updatePostController = async (req: Request, res: Response) => {
    const updatedPost = await postService.updatePostService(req.body, req.params.id)
    if (!updatedPost) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}

export const deletePostController = async (req: Request, res: Response) => {
    const deletedPost = await postService.deletePostService(req.params.id)
    if (!deletedPost) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}

export const getPostCommentsController = async (req: Request, res: Response) => {
    const post = await postQueryRepository.getPostById(req.params.id)
    if (!post) {
        res.status(404).end()
        return
    }
    const sanitizedQuery = queryHelper(req.query)
    const comments = await commentsQueryRepository.getPostComments(req.params.id, sanitizedQuery)
    if (!comments) {
        res.status(404).end()
        return
    }
    res.status(200).json(comments)
}

export const createPostComment = async (req: Request, res: Response) => {
    const post = await postQueryRepository.getPostById(req.params.id)
    if (!post) {
        res.status(404).end()
        return
    }
    const comments = await commentsService.createPostCommentService(req.params.id, req.body.content, req.headers.authorization as string, req.userId!)
    if (!comments) {
        res.status(404).end()
        return
    }
    res.status(201).json(comments)
}
