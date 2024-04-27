import {apiUsageRepository} from "../repositories/apiUsageRepository";

export const apiUsageService = {
    findRecords: async (IP: string, URL: string, date: Date) => {
        const currentDate = new Date();
        const newTime = currentDate.getTime() - 10000;
        const newDate = new Date(newTime);
        return await apiUsageRepository.findRecords(IP, URL, date, newDate);
    }
}
