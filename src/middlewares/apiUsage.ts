import {NextFunction, Request, Response} from "express";
import {apiUsageService} from "../services/apiUsageService";

export const apiUsageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const IP = req.ip;
    const URL =  req.baseUrl || req.originalUrl
    const date = new Date();
    const result = await apiUsageService.findRecords(IP!, URL, date);
    if(result.length > 5) {
        console.log("API usage limit exceeded")
        res.status(429).end();
        return;
    }
    next();
}
