import {devicesSessionsCollection} from "../db/mongo-db";

export const securityRepository = {
    deleteAllSessions: async (userId: string, deviceId: string) => {
        await devicesSessionsCollection.deleteMany({userId: userId, deviceId: {$ne: deviceId}});
    },
    deleteSpecificSession: async (userId: string, deviceId: string) => {
        await devicesSessionsCollection.deleteOne({userId: userId, deviceId: deviceId});
    },
    createDeviceSession: async (userId: string, deviceId: string, issuedAt: string, expiredAt: string, ip: string, lastActiveDate: string, title: string) => {
        await devicesSessionsCollection.insertOne({userId, deviceId, issuedAt, expiredAt, ip, lastActiveDate, title});
    },
    updateLastActiveDate: async (userId: string, deviceId: string, lastActiveDate: string) => {
        await devicesSessionsCollection.updateOne({userId: userId, deviceId: deviceId}, {$set: {lastActiveDate: lastActiveDate}});
    },
    updateAfterRefreshToken: async (userId: string, deviceId: string, issuedAt: string, expiredAt: string) => {
        await devicesSessionsCollection.updateOne({userId: userId, deviceId: deviceId}, {$set: {issuedAt: issuedAt, expiredAt: expiredAt}});
    }
}
