import {BlogDBType, BlogModel, UpdateBlogType} from "./blogsTypes";
import {ObjectId} from "mongoose";
import {injectable} from "inversify";
@injectable()
export class BlogsRepository {
    async createBlog(dto: BlogDBType): Promise<string> {
        const blog = new BlogModel(dto)
        await blog.save()
        return blog._id.toString()
    }
    async updateBlog(dto: UpdateBlogType, id: string): Promise<[] | BlogDBType[]> {
        const result:any = await BlogModel.updateOne({_id: id}, {$set:dto})
            if (result.modifiedCount === 0) {
                return []
            }
            return BlogModel.find({_id: id})
    }
    async deleteBlog(id: string): Promise<BlogDBType[]> {
        const result:any = await BlogModel.deleteOne({_id: id})

        if (result.deletedCount === 0) {
            return []
        }
        return BlogModel.find({})
    }
    async getBlogById(id: string): Promise<BlogDBType | null> {
        return BlogModel.findOne({_id: id})
    }
}
