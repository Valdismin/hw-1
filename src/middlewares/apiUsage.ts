import {NextFunction, Request, Response} from "express";
import {apiUsageService} from "../services/apiUsageService";

export const apiUsageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const IP = req.ip;
    const URL =  req.baseUrl || req.originalUrl
    const date = new Date();
    const result = await apiUsageService.findRecords(IP!, URL, date);
    console.log(result.length, "result.length")
    if(result.length > 5) {
        res.status(429).end();
        return;
    }
    next();
}
