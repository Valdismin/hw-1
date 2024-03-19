import {Request, Response} from "express";
import {blogCollection, postCollection} from "../db/mongo-db";
export const clearDatabaseController = async (req: Request, res: Response) => {
    await postCollection.drop()
    await blogCollection.drop()
    res
        .status(204).end()
}
