import {apiUsageCollection} from "../db/mongo-db";

export const apiUsageRepository = {
    setRecord: async (IP: string, URL: string, date: Date) => {
        await apiUsageCollection.insertOne({IP, URL, date});
    },
    findRecords: async (IP: string, URL: string, date: Date, currentDate: Date) => {
        return await apiUsageCollection.find({IP:IP, URL:URL, date: {$gte: currentDate}}).toArray();
    }
}
