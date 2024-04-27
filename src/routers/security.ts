import {Router} from "express";
import {deleteDeviceSession, deleteDevicesSessions, getDevicesSessions} from "../controllers/securityController";
import {checkRefreshToken} from "../middlewares/checkRefreshToken";

export const securityRouter = Router()

securityRouter.get('/devices', checkRefreshToken, getDevicesSessions)
securityRouter.delete('/devices', checkRefreshToken, deleteDevicesSessions)
securityRouter.delete('/devices/:deviceId', checkRefreshToken, deleteDeviceSession)
