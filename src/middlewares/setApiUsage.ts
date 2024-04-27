import {NextFunction, Request, Response} from "express";
import {apiUsageService} from "../services/apiUsageService";

export const setApiUsage = async (req: Request, res: Response, next: NextFunction) => {
    const IP = req.ip;
    const URL = req.baseUrl || req.originalUrl
    await apiUsageService.setRecord(IP!, URL);
    next();
}
