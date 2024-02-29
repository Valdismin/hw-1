import {Router} from 'express'
import {getVideosController, createVideoController, findVideoController, deleteVideoController} from '../controllers/videoController'

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.delete('/:id', deleteVideoController)
