import {Request, Response} from "express";
import {blogCollection, commentsCollection, postCollection, userCollection} from "../db/mongo-db";
export const clearDatabaseController = async (req: Request, res: Response) => {
    await postCollection.drop()
    await blogCollection.drop()
    await userCollection.drop()
    await commentsCollection.drop()
    res
        .status(204).end()
}
