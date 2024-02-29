import {Resolutions, ResolutionsType} from "../config/video.config";
import {InputVideoType, OutputErrorsType} from "../types";

export const createVideoInputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    const errorCondition = !Array.isArray(video.availableResolution)
        || video.availableResolution.find(p => !Resolutions[p as ResolutionsType])
        || video.title.length > 40
        || video.title.length === 0
        || video.author.length > 20
        || video.author.length === 0


    if (errorCondition) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    return errors
}
