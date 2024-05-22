import {Request, Response} from "express";
import {SecurityQueryRepository} from "./securityQueryRepository";
import {SecurityService} from "./securityService";
import {inject, injectable} from "inversify";

@injectable()
export class SecurityController {
    constructor(@inject(SecurityQueryRepository) protected securityQueryRepository: SecurityQueryRepository, @inject(SecurityService) protected securityService: SecurityService) {
    }

    async getDevicesSessions(req: Request, res: Response) {
        const id = req.userId
        const devicesSessions = await this.securityQueryRepository.getDevicesSessions(id!);
        res.status(200).json(devicesSessions)
    }

    async deleteDevicesSessions(req: Request, res: Response) {
        const id = req.userId
        await this.securityService.deleteDevicesSessions(id!, req.deviceId!);
        res.status(204).end();
    }

    async deleteDeviceSession(req: Request, res: Response) {
        const deviceId = req.params.deviceId;
        const id = req.userId
        const result = await this.securityService.deleteSpecificDeviceSession(id!, deviceId);
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
