import {securityRepository} from "../repositories/securityRepository";
import {JWTService} from "./JWTService";

export const securityService = {
    deleteDevicesSessions: async (userId: string, deviceId: string) => {
        await securityRepository.deleteAllSessions(userId, deviceId);
    },
    deleteSpecificDeviceSession: async (userId: string, deviceId: string, token:string) => {
        const result = await securityRepository.findSession(deviceId);
        if(!result) {
            return null
        }

        const deleteOperationResult = await securityRepository.deleteSpecificSession(userId, deviceId);
        // if(deleteOperationResult) {
        //     await JWTService.killRefreshToken(token);
        // }
        return deleteOperationResult
    },
    createDeviceSession: async (refreshToken: string, ip: string, title: string) => {
        const tokenFields = JWTService.getFieldsForDeviceSession(refreshToken)
        if(!tokenFields) {
            return null
        }
        const lastActiveDate = new Date().toISOString();
        return await securityRepository.createDeviceSession(tokenFields.userId, tokenFields.deviceId, tokenFields.issuedAt, tokenFields.expiredAt, ip, lastActiveDate, title);
    },
    updateLastActiveDate: async (userId: string, deviceId: string) => {
        const lastActiveDate = new Date().toISOString();
        await securityRepository.updateLastActiveDate(userId, deviceId, lastActiveDate);
    },
    updateAfterRefreshToken: async (refreshToken: string) => {
        const tokenFields = JWTService.getFieldsForDeviceSession(refreshToken)
        if(!tokenFields) {
            return null
        }
        return await securityRepository.updateAfterRefreshToken(tokenFields.userId, tokenFields.deviceId, tokenFields.issuedAt, tokenFields.expiredAt);
    }
}
