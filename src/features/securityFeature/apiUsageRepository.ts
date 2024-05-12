
import {ApiUsageModel} from "./apiUsageTypes";

export class ApiUsageRepository {
     async setRecord(IP: string, URL: string, date: Date) {
        const apiUsage = new ApiUsageModel({IP, URL, date});
        await apiUsage.save();
    }
    async findRecords(IP: string, URL: string, date: Date, currentDate: Date) {
        return ApiUsageModel.find({IP:IP, URL:URL, date: {$gte: currentDate}});
    }
}
