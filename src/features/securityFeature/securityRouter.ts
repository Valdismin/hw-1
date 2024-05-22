import {Router} from "express";
import {checkRefreshToken} from "../../middlewares/checkRefreshToken";
import {container} from "../../db/ioc";
import {SecurityController} from "./securityController";

const securityController = container.get(SecurityController)

export const securityRouter = Router()

securityRouter.get('/devices', checkRefreshToken, securityController.getDevicesSessions.bind(securityController))
securityRouter.delete('/devices', checkRefreshToken, securityController.deleteDevicesSessions.bind(securityController))
securityRouter.delete('/devices/:deviceId', checkRefreshToken, securityController.deleteDeviceSession.bind(securityController))
