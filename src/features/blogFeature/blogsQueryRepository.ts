import {BlogModel, BlogViewModelType, OutputPaginatedBlogsType} from "./blogsTypes";
import {blogsMapper} from "./utils/blogMapper";

export class BlogsQueryRepository {
    async getBlogs(query: any): Promise<OutputPaginatedBlogsType | undefined> {
        const search = query.searchNameTerm ? {name: {$regex: query.searchNameTerm, $options: 'i'}} : {}
        try {
            const items: any = await BlogModel.find(search).sort({[query.sortBy]: query.sortDirection})
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

    async getBlogById(id: string): Promise<BlogViewModelType | undefined> {
        const blog = await BlogModel.findOne({_id: id}).exec()

        if (!blog) {
            return undefined
        }

        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }
}
