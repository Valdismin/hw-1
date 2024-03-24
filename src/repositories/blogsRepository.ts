import {BlogDBType, InputBlogType, OutputBlogType, UpdateBlogType} from "../types/blogsTypes";
import {blogCollection} from "../db/mongo-db";
import {blogService} from "../services/blogService";

export const blogsRepository = {
    async createBlog(blog: InputBlogType): Promise<OutputBlogType | null> {
        const newBlog = blogService.createBlogService(blog)
        await blogCollection.insertOne(newBlog)
        return blogCollection.findOne({id: newBlog.id}, {projection: {_id: 0}})
    },
    async updateBlog(blog: UpdateBlogType, id: string): Promise<OutputBlogType[]> {
        const result = await blogCollection.updateOne({id: id}, {$set: blog})
        if (result.modifiedCount === 0) {
            return []
        }
        return blogCollection.find({id: id}, { projection: { _id: 0 } }).toArray()
    },
    async deleteBlog(id: string): Promise<OutputBlogType[]> {
        const result = await blogCollection.deleteOne({id: id})
        if (result.deletedCount === 0) {
            return []
        }
        return blogCollection.find({}, { projection: { _id: 0 } }).toArray()
    }
}
