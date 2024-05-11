import {devicesSessionsCollection} from "../../db/mongo-db";

export const securityQueryRepository = {
    getDevicesSessions: async (userId: string) => {
        return await devicesSessionsCollection.find({userId: userId}).project({
            _id: 0,
            expiredAt: 0,
            issuedAt: 0,
            userId: 0
        }).toArray();
    }
}
