import {ObjectId} from "mongodb";

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
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
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
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
    blogId: string,
    blogName: string
    createdAt?: string,
}
