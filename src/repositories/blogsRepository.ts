import {InputBlogType, OutputBlogType, UpdateBlogType} from "../types/blogsTypes";
import {blogCollection} from "../db/mongo-db";

export const blogsRepository = {
    async createBlog(blog: InputBlogType) {
        const newBlog = {
            createdAt: new Date().toISOString(),
            isMembership: false,
            id: `${Date.now() + Math.random()}`,
            ...blog
        }
        await blogCollection.insertOne(newBlog)
        return await blogCollection.findOne({id: newBlog.id}, {projection: {_id: 0}})
    },
    async getBlogs(): Promise<OutputBlogType[]> {
        return await blogCollection.find({}, { projection: { _id: 0 } }).toArray();
    },
    async updateBlog(blog: UpdateBlogType, id: string) {
        const result = await blogCollection.updateOne({id: id}, {$set: blog})
        if (result.modifiedCount === 0) {
            return []
        }
        return blogCollection.find({id: id}, { projection: { _id: 0 } })
    },
    async deleteBlog(id: string) {
        const result = await blogCollection.deleteOne({id: id})
        if (result.deletedCount === 0) {
            return []
        }
        return blogCollection.find({}, { projection: { _id: 0 } }).toArray()
    },
    async findBlogById(id: string) {
        return await blogCollection.findOne({id: id}, { projection: { _id: 0 } })
    },
}
