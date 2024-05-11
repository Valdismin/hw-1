import {Request, Response} from "express";
import {
    commentsCollection,
    postCollection,
    userCollection,
    expiredTokensCollection,
    apiUsageCollection, devicesSessionsCollection
} from "../../db/mongo-db";
export const clearDatabaseController = async (req: Request, res: Response) => {
    await postCollection.drop()
    await userCollection.drop()
    await commentsCollection.drop()
    await expiredTokensCollection.drop()
    await apiUsageCollection.drop()
    await devicesSessionsCollection.drop()
    res
        .status(204).end()
}
