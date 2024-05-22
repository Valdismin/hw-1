import {Request, Response} from "express";
import {BlogDBType, BlogViewModelType, OutputPaginatedBlogsType} from "./blogsTypes";
import {BlogsQueryRepository} from "./blogsQueryRepository";
import {queryHelper} from "../../utils/helpers";
import {BlogService} from "./blogService";
import {Schema} from "mongoose";
import {inject, injectable} from "inversify";
import {RefreshTokenRepository} from "../authFeature/refreshTokenRepository";

@injectable()
export class BlogsController {
    constructor(@inject(BlogService) protected blogService: BlogService, @inject(BlogsQueryRepository) protected blogsQueryRepository: BlogsQueryRepository) {
    }

    async createBlog(req: Request, res: Response<BlogViewModelType>) {
        const newBlogId = await this.blogService.createBlogService(req.body);
        const blog = await this.blogsQueryRepository.getBlogById(newBlogId)

        res
            .status(201)
            .json(blog)
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
        const id = req.params.id
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
        const id = req.params.id
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
        const id = req.params.id
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
