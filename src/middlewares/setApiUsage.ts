import {NextFunction, Request, Response} from "express";
import {apiUsageService} from "../features/securityFeature/apiUsageService";

export const setApiUsage = async (req: Request, res: Response, next: NextFunction) => {
    const IP = req.ip;
    const URL = req.originalUrl || req.baseUrl
    await apiUsageService.setRecord(IP!, URL);
    next();
}
