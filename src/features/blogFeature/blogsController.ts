import {Request, Response} from "express";
import {BlogDBType, OutputPaginatedBlogsType} from "./blogsTypes";
import {BlogsQueryRepository} from "./blogsQueryRepository";
import {queryHelper} from "../../utils/helpers";
import {BlogService} from "./blogService";
import {OutputErrorsType} from "../../types/errorsTypes";
import {Schema} from "mongoose";

export class BlogsController {
    constructor(protected blogService: BlogService, protected blogsQueryRepository: BlogsQueryRepository) {}
    async createBlog(req: Request, res: Response<BlogDBType | OutputErrorsType>) {
        const newBlog = await this.blogService.createBlogService(req.body);
        res
            .status(201)
            .json(newBlog as BlogDBType)
    }

    async getBlogs(req: Request, res: Response<OutputPaginatedBlogsType | undefined>) {
        const sanitizedQuery = queryHelper(req.query)
        const blogs = await this.blogsQueryRepository.getBlogs(sanitizedQuery)

        if (!blogs) {
            res
                .status(
                    404
                ).end()

            return
        }

        res
            .status(200)
            .json(blogs)
    }

    async updateBlog(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const updatedBlog = await this.blogService.updateBlogService(req.body, id)
        if (updatedBlog.length === 0) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }

    async deleteBlog(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const deletedBlog = await this.blogService.deleteBlogService(id)
        if (deletedBlog.length === 0) {
            res
                .status(404).end()
            return
        }
        res
            .status(204).end()
    }

    async findBlog(req: Request, res: Response<BlogDBType>) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.params.id as Schema.Types.ObjectId
        const blog = await this.blogsQueryRepository.getBlogById(id)
        if (!blog) {
            res
                .status(404).end()
            return
        }
        res
            .status(200)
            .json(blog)
    }
}
