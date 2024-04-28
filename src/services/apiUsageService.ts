import {apiUsageRepository} from "../repositories/apiUsageRepository";

export const apiUsageService = {
    setRecord: async (IP: string, URL: string) => {
        const date = new Date();
        return await apiUsageRepository.setRecord(IP, URL, date);
    },
    findRecords: async (IP: string, URL: string, date: Date) => {
        const currentDate = new Date();
        const newTime = currentDate.getTime() - 10000;
        console.log(currentDate.getTime(), "currentDate");
        console.log(newTime, "newTime");
        const newDate = new Date(newTime);
        console.log(newDate, "newDate");
        return await apiUsageRepository.findRecords(IP, URL, date, newDate);
    }
}
