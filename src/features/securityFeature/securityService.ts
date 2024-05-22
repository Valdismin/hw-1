import {JWTService} from "../authFeature/JWTService";
import {SecurityRepository} from "./securityRepository";
import {inject, injectable} from "inversify";
import {CommentsService} from "../commentsFeature/commentsService";

@injectable()
export class SecurityService {
    constructor(@inject(SecurityRepository) protected securityRepository: SecurityRepository, @inject(JWTService) protected JWTService: JWTService) {
    }

    async deleteDevicesSessions(userId: string, deviceId: string) {
        await this.securityRepository.deleteAllSessions(userId, deviceId);
    }
    async deleteSpecificDeviceSession(userId: string, deviceId: string) {
        const result = await this.securityRepository.findSession(deviceId);
        if(!result) {
            return null
        }

        return await this.securityRepository.deleteSpecificSession(userId, deviceId)
    }
    async createDeviceSession(refreshToken: string, ip: string, title: string) {
        const tokenFields = this.JWTService.getFieldsForDeviceSession(refreshToken)

        if(!tokenFields) {
            return null
        }
        const lastActiveDate = new Date().toISOString();
        return await this.securityRepository.createDeviceSession(tokenFields.userId, tokenFields.deviceId, tokenFields.issuedAt, tokenFields.expiredAt, ip, lastActiveDate, title);
    }
    async updateLastActiveDate(userId: string, deviceId: string) {
        const lastActiveDate = new Date().toISOString();
        await this.securityRepository.updateLastActiveDate(userId, deviceId, lastActiveDate);
    }
    async updateAfterRefreshToken(refreshToken: string) {
        const tokenFields = this.JWTService.getFieldsForDeviceSession(refreshToken)
        if(!tokenFields) {
            return null
        }
        return await this.securityRepository.updateAfterRefreshToken(tokenFields.userId, tokenFields.deviceId, tokenFields.issuedAt, tokenFields.expiredAt);
    }
}
