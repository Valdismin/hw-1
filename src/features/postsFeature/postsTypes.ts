import mongoose, {model, Model, ObjectId} from "mongoose";

export enum LikeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

const postsSchema = new mongoose.Schema<PostDBType>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: mongoose.Schema.ObjectId, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    likes: [{
        likeStatus: {type: String, required: true},
        userId: {type: String, required: true},
        createdAt: {type: String, default: Date.now},
        userLogin: {type: String, required: true}
    }]
})

type PostModel = Model<PostDBType>;
export const PostModel = model<PostDBType, PostModel>('Post', postsSchema)

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type ExtendedInputPostType = InputPostType & {
    blogName: string
}

export type InputForBlogsPostType = {
    title: string,
    shortDescription: string,
    content: string,
}

export type UpdatePostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
}

export type OutputPostType = {
    _id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
    blogName: string,
    createdAt?: string,
    extendedLikesInfo: ExtendedLikesInfoType
}
export type OutputPaginatedPostType = {
    items: OutputPostType[],
    totalCount: number,
    pagesCount: number,
    page: string,
    pageSize: string
}

export type PostViewModelType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
    blogName: string
    createdAt?: string,
    extendedLikesInfo: ExtendedLikesInfoType
}
type newestLikesType = {
    addedAt: string,
    userId: string,
    login: string
}
type ExtendedLikesInfoType = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeStatus,
    newestLikes: newestLikesType[]
}

export type LikesAndDislikesType = {
    likeStatus: LikeStatus,
    userId: string,
    createdAt: string,
    userLogin: string
}


export type PostDBType = {
    _id?: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
    blogName: string
    createdAt?: string,
    likes: LikesAndDislikesType[]
}
