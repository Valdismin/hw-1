import {securityQueryRepository} from "./securityQueryRepository";
import {Request, Response} from "express";
import {securityService} from "./securityService";

export const getDevicesSessions = async (req: Request, res: Response) => {
    const devicesSessions = await securityQueryRepository.getDevicesSessions(req.userId!);
    res.status(200).json(devicesSessions)
}

export const deleteDevicesSessions = async (req: Request, res: Response) => {
    await securityService.deleteDevicesSessions(req.userId!, req.deviceId!);
    res.status(204).end();
}

export const deleteDeviceSession = async (req: Request, res: Response) => {
    const deviceId = req.params.deviceId;
    const token = req.cookies.refreshToken;
    const result = await securityService.deleteSpecificDeviceSession(req.userId!, deviceId, token);
    if (result === null) {
        res.status(404).end();
        return;
    }
    if(!result) {
        res.status(403).end();
        return;
    }
    res.status(204).end();
}
