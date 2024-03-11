import {Request, Response} from 'express'
import {postsRepository} from "../repositories/postsRepository";
import {OutputPostType} from "../types/postsTypes";

export const getPostsController = async (req: Request, res: Response<OutputPostType[]>) => {
    const posts = await postsRepository.getPosts()
    if (posts.length === 0) {
        res.status(404).end()
        return
    }
    res.status(200).json(posts)
}

export const createPostController = async (req: Request, res: Response<OutputPostType>) => {
    const post = await postsRepository.createPost(req.body)

    res.status(201).json(post)
}

export const getPostByIdController = async (req: Request, res: Response<OutputPostType>) => {
    const post = await postsRepository.getPostById(req.params.id)
    if (Array.isArray(post)) {
        res.status(404).end()
        return
    }

    res.status(200).json(post)
}

export const updatePostController = async (req: Request, res: Response) => {
    const updatedPost = await postsRepository.updatePost(req.body, req.params.id)
    if (Array.isArray(updatedPost)) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}

export const deletePostController = async (req: Request, res: Response) => {
    const deletedPost = await postsRepository.deletePost(req.params.id)
    if (deletedPost.length === 0) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}
