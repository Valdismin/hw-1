import {Request, Response} from "express";
import {PostModel} from "../postsFeature/postsTypes";
import {UsersModel} from "../usersFeature/usersTypes";
import {CommentModel} from "../commentsFeature/commentsTypes";
import {ExpiredTokensModel} from "../authFeature/tokensTypes";
import {ApiUsageModel} from "../securityFeature/apiUsageTypes";
import {DevicesSessionsModel} from "../securityFeature/devicesSessionsTypes";
import {BlogModel} from "../blogFeature/blogsTypes";


export const clearDatabaseController = async (req: Request, res: Response) => {
    await BlogModel.collection.drop()
    await PostModel.collection.drop()
    await UsersModel.collection.drop()
    await CommentModel.collection.drop()
    await ExpiredTokensModel.collection.drop()
    await ApiUsageModel.collection.drop()
    await DevicesSessionsModel.collection.drop()
    res
        .status(204).end()
}
