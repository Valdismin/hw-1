import {Request, Response} from 'express'
import {db} from '../db/db'
import {createVideoInputValidation, updateVideoInputValidation} from "../validation/videos";
import {VideoDBType, OutputVideoType, OutputErrorsType} from "../types";
import {dataset2} from "../../__tests__/datasets";

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

    const newDate = new Date(Date.now())
    const publishDate = new Date(newDate.getDate() + 1)

    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: newDate.toISOString(),
        publicationDate: publishDate.toISOString(),
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .json(newVideo)
}

export const findVideoController = (req: Request, res: Response<OutputVideoType>) => {
    let foundVideo = db.videos.filter(item => item.id === Number(req.params.id))[0];
    if (!foundVideo) {
        res.status(404).end()
        return
    }

    res
        .status(200)
        .json(foundVideo)
}

export const updateVideoController = (req: Request, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = updateVideoInputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    const index = db.videos.findIndex(item => item.id === Number(req.params.id))
    if (index < 0) {
        res.status(404).end()
        return
    }

    db.videos[index] = {...db.videos[index], ...req.body};

    res
        .status(204).end()
}


export const deleteVideoController = (req: Request, res: Response<OutputVideoType[]>) => {
    const index = db.videos.findIndex(item => item.id === Number(req.params.id))
    if (index < 0) {
        res.status(404).end()
        return
    }

    db.videos.splice(index, 1);

    res
        .status(204).end()

}
