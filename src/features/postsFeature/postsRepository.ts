import {PostDBType, PostModel, UpdatePostType} from "./postsTypes";
import {ObjectId} from "mongoose";

export class PostsRepository {
    async createPost(dto: PostDBType): Promise<PostDBType | null> {
        const post = new PostModel(dto)
        await post.save()
        return PostModel.findOne({_id: dto._id})
    }
    async updatePost(dto: UpdatePostType, id: ObjectId): Promise<boolean | null> {
        const updatedPost: any = await PostModel.updateOne({_id: id}, {$set: dto})
        if (updatedPost.modifiedCount === 0) {
            return null
        }
        return true
    }
    async deletePost(id: ObjectId): Promise<PostDBType[] | null> {
        const result:any  = PostModel.deleteOne({_id: id})

        if (result.deletedCount === 0) {
            return null
        }
        return PostModel.find({_id: id})
    }
}
