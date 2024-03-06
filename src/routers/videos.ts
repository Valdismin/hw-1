import {Router} from 'express'
import {getVideosController, createVideoController, updateVideoController, findVideoController, deleteVideoController} from '../controllers/videoController'

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', updateVideoController)
videosRouter.delete('/:id', deleteVideoController)
