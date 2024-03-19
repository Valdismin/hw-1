import {ObjectId} from "mongodb";

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: ObjectId,
}

export type UpdatePostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId?: ObjectId,
}

export type OutputPostType = {
    _id?: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId?: ObjectId,
    blogName: string,
    createdAt?: string,
}

export type PostDBType = {
    _id?: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: ObjectId,
    blogName: string
    createdAt?: string,
}
