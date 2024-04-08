import {Request, Response} from 'express'
import {postsRepository} from "../repositories/postsRepository";
import {OutputPaginatedPostType, OutputPostType} from "../types/postsTypes";
import {queryHelper} from "../helpers";
import {postQueryRepository} from "../repositories/postQueryRepository";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {postService} from "../services/postService";
import {commentsQueryRepository} from "../repositories/commentsQueryRepository";
import {commentsService} from "../services/commentsService";

export const getPostsController = async (req: Request, res: Response<OutputPaginatedPostType | undefined>) => {
    const sanitizedQuery = queryHelper(req.query)
    if (req.params.blogId) {
        const blogs = await blogsQueryRepository.getBlogById(req.params.blogId)
        if (!blogs) {
            res.status(404).end()
            return
        }
    }

    const posts = await postQueryRepository.getManyPosts(sanitizedQuery, req.params.blogId)
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
    const blog = await blogsQueryRepository.getBlogById(req.params.blogId)
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
    const sanitizedQuery = queryHelper(req.query)
    const comments = await commentsQueryRepository.getPostComments(req.params.id, sanitizedQuery)
    if (!comments) {
        res.status(404).end()
        return
    }
    res.status(200).json(comments)
}

export const createPostComment = async (req: Request, res: Response) => {
    const comments = await commentsService.createPostCommentService(req.params.id, req.body.content, req.headers.authorization as string, req.userId!)
    if (!comments) {
        res.status(404).end()
        return
    }
    res.status(201).json(comments)
}
