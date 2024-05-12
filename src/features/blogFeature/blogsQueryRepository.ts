import {BlogDBType, BlogModel, OutputPaginatedBlogsType} from "./blogsTypes";
import {ObjectId} from "mongoose";
import {blogsMapper} from "./utils/blogMapper";

export class BlogsQueryRepository {
    async getBlogs(query: any): Promise<OutputPaginatedBlogsType | undefined> {
        const search = query.searchNameTerm ? {name: {$regex: query.searchNameTerm, $options: 'i'}} : {}
        try {
            const items: any = await BlogModel.find(search).sort({ [query.sortBy]: query.sortDirection })
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
            const c = await BlogModel.countDocuments(search).exec()

            const mappedBlogs = blogsMapper(items)

            return {
                items: mappedBlogs,
                totalCount: c,
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize
            }
        } catch (e) {
            return undefined
        }

    }
    async getBlogById(id: ObjectId): Promise<BlogDBType | null> {
        return BlogModel.findOne({_id: id})
    }
}
