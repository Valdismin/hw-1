import {ObjectId} from "mongoose";

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
    id: string,
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

export type PostDBType = {
    _id?: ObjectId,
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: ObjectId,
    blogName: string
    createdAt?: string,
}
