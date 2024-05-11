import {NextFunction, Request, Response} from "express";
import {apiUsageService} from "../features/securityFeature/apiUsageService";

export const apiUsageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const IP = req.ip;
    const URL =  req.originalUrl || req.baseUrl

    const date = new Date();
    const result = await apiUsageService.findRecords(IP!, URL, date);
    if(result.length > 5) {
        res.status(429).end();
        return;
    }
    next();
}
