import {ExtendedInputPostType, PostDBType, PostModel, UpdatePostType} from "./postsTypes";
import {injectable} from "inversify";

@injectable()
export class PostsRepository {
    async createPost(dto: ExtendedInputPostType): Promise<string> {
        const post = new PostModel(dto)
        const result = await post.save()
        return result._id.toString()
    }

    async updatePost(dto: UpdatePostType, id: string): Promise<boolean | null> {
        const updatedPost: any = await PostModel.updateOne({_id: id}, {$set: dto})
        if (updatedPost.modifiedCount === 0) {
            return null
        }
        return true
    }

    async deletePost(id: string): Promise<PostDBType[] | null> {
        const result: any = PostModel.deleteOne({_id: id})

        if (result.deletedCount === 0) {
            return null
        }
        return PostModel.find({_id: id})
    }

    async checkUserLike(postId: string, userId: string) {
        const post = await PostModel.findOne({_id: postId, likes: {$elemMatch: {userId: userId}}})

        return !!post
    }

    async addLikeToPost(postId: string, userId: string, likeStatus: string, login: string) {
        const result: any = await PostModel.updateOne({_id: postId}, {
            $push: {
                likes: {
                    likeStatus: likeStatus,
                    userId: userId,
                    userLogin: login,
                    createdAt: new Date().toISOString()
                }
            }
        })

        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }

    async updateLikeToPost(postId: string, userId: string, likeStatus: string, login: string): Promise<boolean | null> {
        const result: any = await PostModel.updateOne({
            _id: postId,
            "likes.userId": userId
        }, {
            $set: {
                likes: {
                    likeStatus: likeStatus,
                    userId: userId,
                    userLogin: login,
                    createdAt: new Date().toISOString()
                }
            }
        })

        if (result.modifiedCount === 0) {
            return null
        }
        return true
    }
}
