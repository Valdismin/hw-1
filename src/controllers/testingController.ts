import {Request, Response} from "express";
import {OutputVideoType} from "../types";
import {setDB} from "../db/db";

export const clearDatabaseController = (req: Request, res: Response<OutputVideoType[]>) => {
    setDB()
    res
        .status(204).end()
}
