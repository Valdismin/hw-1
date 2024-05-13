import mongoose, {model, Model, ObjectId} from "mongoose";

const postsSchema = new mongoose.Schema<PostDBType>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: mongoose.Schema.ObjectId, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

type PostModel = Model<PostDBType>;
export const PostModel = model<PostDBType, PostModel>('Post', postsSchema)

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: ObjectId,
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
    blogId?: ObjectId,
}

export type OutputPostType = {
    _id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: ObjectId,
    blogName: string,
    createdAt?: string,
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
    blogId?: ObjectId,
    blogName: string
    createdAt?: string,
}

export type PostDBType = {
    _id?: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: ObjectId,
    blogName: string
    createdAt?: string,
}
