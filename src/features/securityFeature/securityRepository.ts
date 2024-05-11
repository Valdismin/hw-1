import {devicesSessionsCollection} from "../../db/mongo-db";

export const securityRepository = {
    deleteAllSessions: async (userId: string, deviceId: string) => {
        await devicesSessionsCollection.deleteMany({userId: userId, deviceId: {$ne: deviceId}});
    },
    deleteSpecificSession: async (userId: string, deviceId: string): Promise<boolean> => {
        const result = await devicesSessionsCollection.deleteOne({userId: userId, deviceId: deviceId});
        return result.deletedCount !== 0;
    },
    findSession: async (deviceId: string) => {
        return await devicesSessionsCollection.findOne({deviceId: deviceId});
    },
    findSessionByManuParams: async (deviceId: string, issuedAt: string) => {
        return await devicesSessionsCollection.findOne({deviceId: deviceId, issuedAt: issuedAt});
    },
    createDeviceSession: async (userId: string, deviceId: string, issuedAt: string, expiredAt: string, ip: string, lastActiveDate: string, title: string) => {
        await devicesSessionsCollection.insertOne({userId, deviceId, issuedAt, expiredAt, ip, lastActiveDate, title});
    },
    updateLastActiveDate: async (userId: string, deviceId: string, lastActiveDate: string) => {
        await devicesSessionsCollection.updateOne({
            userId: userId,
            deviceId: deviceId
        }, {$set: {lastActiveDate: lastActiveDate}});
    },
    updateAfterRefreshToken: async (userId: string, deviceId: string, issuedAt: string, expiredAt: string) => {
        console.log(userId, deviceId, issuedAt, expiredAt);
        const res = await devicesSessionsCollection.findOne({userId: userId, deviceId: deviceId})
        console.log(res, 'res')
        const result = await devicesSessionsCollection.updateOne({userId: userId, deviceId: deviceId}, {
            $set: {
                issuedAt: issuedAt,
                expiredAt: expiredAt
            }
        });
        console.log(result)
    }
}
