import {ObjectId} from "mongodb";

export type InputBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

export type UpdateBlogType = {
    name: string,
    description: string,
    websiteUrl: string
}

export type OutputBlogType = {
    _id?: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt?: string,
    isMembership?: boolean
}

export type BlogDBType = {
    _id?: ObjectId,
    name: string,
    description: string,
    websiteUrl: string
    createdAt?: string,
    isMembership?: boolean
}
