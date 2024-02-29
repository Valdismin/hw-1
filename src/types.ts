import {ResolutionsType} from "./config/video.config";

export type InputVideoType = {
    title: string
    author: string
    availableResolution: string[]
}

export type OutputVideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export type OutputErrorsType = {
    errorsMessages: ErrorType[]
}

export type ErrorType = {
    message: string
    field: string
}

export type VideoDBType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}
