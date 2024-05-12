import {Request, Response} from "express";
import {SecurityQueryRepository} from "./securityQueryRepository";
import {SecurityService} from "./securityService";
import {Schema} from "mongoose";


export class SecurityController {
    constructor(protected securityQueryRepository: SecurityQueryRepository, protected securityService: SecurityService) {
    }

    async getDevicesSessions(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.userId as Schema.Types.ObjectId
        const devicesSessions = await this.securityQueryRepository.getDevicesSessions(id);
        res.status(200).json(devicesSessions)
    }

    async deleteDevicesSessions(req: Request, res: Response) {
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.userId as Schema.Types.ObjectId
        await this.securityService.deleteDevicesSessions(id, req.deviceId!);
        res.status(204).end();
    }

    async deleteDeviceSession(req: Request, res: Response) {
        const deviceId = req.params.deviceId;
        const token = req.cookies.refreshToken;
        //@ts-ignore
        //TODO: ask on the lesson
        const id = req.userId as Schema.Types.ObjectId
        const result = await this.securityService.deleteSpecificDeviceSession(id, deviceId, token);
        if (result === null) {
            res.status(404).end();
            return;
        }
        if (!result) {
            res.status(403).end();
            return;
        }
        res.status(204).end();
    }
}
