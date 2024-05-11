import {apiUsageRepository} from "./apiUsageRepository";

export const apiUsageService = {
    setRecord: async (IP: string, URL: string) => {
        const date = new Date();
        return await apiUsageRepository.setRecord(IP, URL, date);
    },
    findRecords: async (IP: string, URL: string, date: Date) => {
        const currentDate = new Date();
        const newTime = currentDate.getTime() - 9999;
        const newDate = new Date(newTime);
        return await apiUsageRepository.findRecords(IP, URL, date, newDate);
    }
}
