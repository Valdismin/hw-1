import {Resolutions, ResolutionsType} from "../config/video.config";
import {InputVideoType, OutputErrorsType} from "../types";

export const createVideoInputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    const resolutionCondition = video?.availableResolution?.length ? !Array.isArray(video.availableResolution)
        || video.availableResolution.find(p => !Resolutions[p as ResolutionsType]) : false
    const titleCondition = !video.title || video.title.length > 40
        || video.title.length === 0
    const authorCondition = !video.author || video.author.length > 20
        || video.author.length === 0

    const errorCondition = resolutionCondition
        || titleCondition
        || authorCondition


    if (errorCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    return errors
}
export const updateVideoInputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    const resolutionCondition = video?.availableResolution?.length ? !Array.isArray(video.availableResolution)
        || video.availableResolution.find(p => !Resolutions[p as ResolutionsType]) : false
    const titleCondition = !video.title || video.title.length > 40
        || video.title.length === 0
    const authorCondition = !video.author || video.author.length > 20
        || video.author.length === 0
    const minAgeRestrictionCondition = video?.minAgeRestriction ? video.minAgeRestriction > 18 || video.minAgeRestriction < 1 : false
    const publicationDateCondition = video?.publicationDate ? video.author.length > 20
        || video.author.length === 0 : false

    if(resolutionCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    if(titleCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }
    if(authorCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'author'
        })
    }

    if(minAgeRestrictionCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'minAgeRestriction'
        })
    }

    if(publicationDateCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'publicationDate'
        })
    }

    return errors
}
