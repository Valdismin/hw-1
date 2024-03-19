import {InputBlogType, OutputBlogType, UpdateBlogType} from "../types/blogsTypes";
import {ObjectId} from "mongodb";
import {blogCollection} from "../db/mongo-db";

export const blogsRepository = {
    async createBlog(blog: InputBlogType) {
        const newBlog = {
            ...blog
        }
        await blogCollection.insertOne(newBlog)
        return newBlog
    },
    async getBlogs(): Promise<OutputBlogType[]> {
        return await blogCollection.find({}).toArray();
    },
    async updateBlog(blog: UpdateBlogType, id: string) {
        const result = await blogCollection.updateOne({_id: new ObjectId(id)}, {$set: blog})
        if (result.modifiedCount === 0) {
            return []
        }
        return blogCollection.find({_id: new ObjectId(id)})
    },
    async deleteBlog(id: string) {
        const result = await blogCollection.deleteOne({_id: new ObjectId(id)})
        if (result.deletedCount === 0) {
            return []
        }
        return blogCollection.find({}).toArray()
    },
    async findBlogById(id: ObjectId) {
        return await blogCollection.findOne({_id: id})
    },
}
