import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {OutputBlogType} from "../types/blogsTypes";
import {OutputErrorsType} from "../types/videosTypes";

export const createBlogController = async (req: Request, res: Response<OutputBlogType | OutputErrorsType>) => {
    const newBlog = await blogsRepository.createBlog(req.body);
    res
        .status(201)
        .json(newBlog as OutputBlogType)
}

export const getBlogsController = async (req: Request, res: Response<OutputBlogType[]>) => {
    const blogs = await blogsRepository.getBlogs()

    res
        .status(200)
        .json(blogs)
}

export const updateBlogController = async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedBlog = await blogsRepository.updateBlog(req.body, id)
    if (Array.isArray(updatedBlog)) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}

export const deleteBlogController = async (req: Request, res: Response) => {
    const id = req.params.id
    const deletedBlog = await blogsRepository.deleteBlog(id)
    if (deletedBlog.length === 0) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}

export const findBlogController = async (req: Request, res: Response<OutputBlogType>) => {
    const id = req.params.id
    const blog = await blogsRepository.findBlogById(id)
    if (!blog) {
        res
            .status(404).end()
        return
    }
    res
        .status(200)
        .json(blog)
}
