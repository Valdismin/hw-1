import {ObjectId} from "mongodb";

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type UpdatePostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
}

export type OutputPostType = {
    _id?: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: string,
    blogName: string,
    createdAt?: string,
}

export type PostDBType = {
    _id?: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
    createdAt?: string,
}
