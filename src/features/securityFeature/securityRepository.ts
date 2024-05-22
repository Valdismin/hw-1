import {DevicesSessionsModel} from "./devicesSessionsTypes";
import {injectable} from "inversify";

@injectable()
export class SecurityRepository {
    async deleteAllSessions(userId: string, deviceId: string) {
        await DevicesSessionsModel.deleteMany({userId: userId, deviceId: {$ne: deviceId}});
    }
    async deleteSpecificSession(userId: string, deviceId: string): Promise<boolean> {
        const result: any = await DevicesSessionsModel.deleteOne({userId: userId, deviceId: deviceId});
        return result.deletedCount !== 0;
    }
    async findSession(deviceId: string) {
        return DevicesSessionsModel.findOne({deviceId: deviceId});
    }
    async findSessionByManuParams(deviceId: string, issuedAt: string) {
        return DevicesSessionsModel.findOne({deviceId: deviceId, issuedAt: issuedAt});
    }
    async createDeviceSession(userId: string, deviceId: string, issuedAt: string, expiredAt: string, ip: string, lastActiveDate: string, title: string) {
        const session = new DevicesSessionsModel({userId, deviceId, issuedAt, expiredAt, ip, lastActiveDate, title})

        await session.save();
    }
    async updateLastActiveDate(userId: string, deviceId: string, lastActiveDate: string) {
        await DevicesSessionsModel.updateOne({
            userId: userId,
            deviceId: deviceId
        }, {$set: {lastActiveDate: lastActiveDate}});
    }
    async updateAfterRefreshToken(userId: string, deviceId: string, issuedAt: string, expiredAt: string) {
        await DevicesSessionsModel.findOne({userId: userId, deviceId: deviceId})
        await DevicesSessionsModel.updateOne({userId: userId, deviceId: deviceId}, {
            $set: {
                issuedAt: issuedAt,
                expiredAt: expiredAt
            }
        });
    }
}
