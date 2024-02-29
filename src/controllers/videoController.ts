import {Request, Response} from 'express'
import {db} from '../db/db'
import {createVideoInputValidation} from "../validation/videos";
import {VideoDBType, OutputVideoType, OutputErrorsType} from "../types";

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
    res
        .status(200)
        .json(db.videos)
}

export const createVideoController = (req: Request, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = createVideoInputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }

    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        // ...
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .json(newVideo)
}

export const findVideoController = (req: Request, res: Response<OutputVideoType>) => {
    let foundVideo = db.videos.filter(item => item.id === Number(req.params.id))[0];
    if (!foundVideo) {
        res.status(404)
        return
    }

    res
        .status(200)
        .json(foundVideo)
}

export const deleteVideoController = (req: Request, res: Response<OutputVideoType[]>) => {
    res
        .status(200)
        .json(db.videos)
}
