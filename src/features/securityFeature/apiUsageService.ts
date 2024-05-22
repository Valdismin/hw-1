import {inject, injectable} from "inversify";
import {SecurityService} from "./securityService";
import {ApiUsageRepository} from "./apiUsageRepository";

@injectable()
export class ApiUsageService {
    constructor(@inject(ApiUsageRepository) protected apiUsageRepository: ApiUsageRepository) {
    }
    async setRecord(IP: string, URL: string) {
        const date = new Date();
        return await this.apiUsageRepository.setRecord(IP, URL, date);
    }

    async findRecords(IP: string, URL: string, date: Date) {
        const currentDate = new Date();
        const newTime = currentDate.getTime() - 9999;
        const newDate = new Date(newTime);
        return await this.apiUsageRepository.findRecords(IP, URL, date, newDate);
    }
}
