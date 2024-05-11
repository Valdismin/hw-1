import mongoose, {model, Model, ObjectId} from "mongoose";

const blogSchema = new mongoose.Schema<BlogDBType>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: {type: String},
    isMembership: {type: Boolean}
})

type BlogModel = Model<BlogDBType>;

export const BlogModel = model<BlogDBType, BlogModel>('Blog', blogSchema)

export type InputBlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt?: string,
    isMembership?: boolean
}

export type UpdateBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

export type OutputBlogType = {
    _id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt?: string,
    isMembership?: boolean
}

export type OutputPaginatedBlogType = {
    _id: ObjectId,
    title: string,
    description: string,
    websiteUrl: string,
    createdAt?: string,
    isMembership?: boolean
}

export type OutputPaginatedBlogsType = {
    items: OutputPaginatedBlogType[],
    totalCount: number,
    pagesCount: number,
    page: string,
    pageSize: string
}

export interface BlogDBType {
    _id?: ObjectId;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt?: string;
    isMembership?: boolean;
}
