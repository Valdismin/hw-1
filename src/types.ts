import {Resolutions} from "./config/video.config";

export type InputVideoType = {
    title: string
    author: string
    availableResolution: Resolutions[]
}
export type UpdateVideoType = {
    title: string
    author: string
    availableResolution?: Resolutions[]
    canBeDownloaded?: boolean
    minAgeRestriction?: number
    publicationDate?: string
}


export type OutputVideoType = {
    id: number
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
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions[]
}
