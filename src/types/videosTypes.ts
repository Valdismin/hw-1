import {Resolutions} from "../config/video.config";
import {ObjectId} from "mongodb";

export type InputVideoType = {
    title: string
    author: string
    availableResolutions: Resolutions[]
}
export type UpdateVideoType = {
    title: string
    author: string
    availableResolutions?: Resolutions[]
    canBeDownloaded?: boolean
    minAgeRestriction?: number
    publicationDate?: string
}


export type OutputVideoType = {
    _id: ObjectId
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions[]
}

export type OutputErrorsType = {
    errorsMessages: ErrorType[]
}

export type ErrorType = {
    message: string
    field: string
}

export type VideoDBType = {
    _id: ObjectId
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions[]
}
