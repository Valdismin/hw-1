import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {OutputBlogType, OutputPaginatedBlogsType} from "../types/blogsTypes";
import {OutputErrorsType} from "../types/videosTypes";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {queryHelper} from "../utils/helpers";
import {blogService} from "../services/blogService";

export const createBlogController = async (req: Request, res: Response<OutputBlogType | OutputErrorsType>) => {
    const newBlog = await blogService.createBlogService(req.body);
    res
        .status(201)
        .json(newBlog as OutputBlogType)
}

export const getBlogsController = async (req: Request, res: Response<OutputPaginatedBlogsType | undefined>) => {
    const sanitizedQuery = queryHelper(req.query)
    const blogs = await blogsQueryRepository.getBlogs(sanitizedQuery)
    if (!blogs) {
        res.status(404).end()
        return
    }
    res
        .status(200)
        .json(blogs)
}

export const updateBlogController = async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedBlog = await blogService.updateBlogService(req.body, id)
    if (updatedBlog.length === 0) {
        res
            .status(404).end()
        return
    }
    res
        .status(204).end()
}

export const deleteBlogController = async (req: Request, res: Response) => {
    const id = req.params.id
    const deletedBlog = await blogService.deleteBlogService(id)
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
    const blog = await blogsQueryRepository.getBlogById(id)
    if (!blog) {
        res
            .status(404).end()
        return
    }
    res
        .status(200)
        .json(blog)
}
