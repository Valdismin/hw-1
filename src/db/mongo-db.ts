import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBType} from "../features/blogFeature/blogsTypes";
import {PostDBType} from "../features/postsFeature/postsTypes";
import {UsersDBType} from "../features/usersFeature/usersTypes";
import {CommentsDBType} from "../features/commentsFeature/commentsTypes";
import {expiredTokenDBType} from "../features/authFeature/tokensTypes";
import {apiUsageDBType} from "../features/securityFeature/apiUsageTypes";
import {devicesSessionsDBType} from "../features/securityFeature/devicesSessionsTypes";
import {recoveryCodeDBType} from "../features/passwordRecoveryFeature/recoveryCodeTypes";
import mongoose from 'mongoose';


const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db: Db = client.db(SETTINGS.DB_NAME);

export const expiredRecoveryCodesCollection: Collection<recoveryCodeDBType> = db.collection<recoveryCodeDBType>(SETTINGS.EXPIRED_RECOVERY_CODES_COLLECTION_NAME)

export const connectToDB = async () => {
    try {
        await mongoose.connect(SETTINGS.MONGO_URL);
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await mongoose.disconnect();
        return false
    }
}
