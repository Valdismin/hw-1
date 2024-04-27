import {securityQueryRepository} from "../repositories/securityQueryRepository";
import {Request, Response} from "express";
import {securityService} from "../services/securityService";

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
    const result = await securityService.deleteSpecificDeviceSession(req.userId!, deviceId);
    if (!result) {
        res.status(404).end();
        return;
    }
    res.status(204).end();
}
