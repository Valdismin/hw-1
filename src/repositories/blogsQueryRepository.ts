import {blogCollection, postCollection} from "../db/mongo-db";
import {OutputBlogType, OutputPaginatedBlogsType} from "../types/blogsTypes";

export const blogsQueryRepository = {
    async getBlogs(query: any): Promise<OutputPaginatedBlogsType | undefined> {
        const search = query.searchNameTerm ? {name: {$regex: query.searchNameTerm, $options: 'i'}} : {}
        try {
            const items: any = await blogCollection.find(search).project({_id: 0})
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray()
            const c = await blogCollection.countDocuments(search)

            return {
                items,
                totalCount: c,
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize
            }
        } catch (e) {
            return undefined
        }

    },
    async getBlogById(id: string): Promise<OutputBlogType | null> {
        return await blogCollection.findOne({id: id}, {projection: {_id: 0}})
    }
}
