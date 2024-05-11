import {BlogDBType, BlogModel, UpdateBlogType} from "./blogsTypes";
import {ObjectId} from "mongoose";

export class BlogsRepository {
    async createBlog(dto: BlogDBType): Promise<BlogDBType | null> {
        const blog = new BlogModel(dto)
        await blog.save()

        return BlogModel.findOne({_id: dto._id})
    }
    async updateBlog(dto: UpdateBlogType, id: ObjectId): Promise<[] | BlogDBType[]> {
        const result:any = await BlogModel.updateOne({_id: id}, {$set:dto})
            if (result.modifiedCount === 0) {
                return []
            }
            return BlogModel.find({_id: id})
    }
    async deleteBlog(id: ObjectId): Promise<BlogDBType[]> {
        const result:any = await BlogModel.deleteOne({_id: id})

        if (result.deletedCount === 0) {
            return []
        }
        return BlogModel.find({})
    }
    async getBlogById(id: ObjectId): Promise<BlogDBType | null> {
        return BlogModel.findOne({_id: id})
    }
}
