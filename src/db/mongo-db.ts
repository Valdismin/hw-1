import {Collection, Db, MongoClient} from "mongodb";
import {SETTINGS} from "../settings";
import {BlogDBType} from "../types/blogsTypes";
import {PostDBType} from "../types/postsTypes";
import {UsersDBType} from "../types/usersTypes";
import {CommentsDBType} from "../types/commentsTypes";
import {expiredTokenDBType} from "../types/tokensTypes";


const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)
export const userCollection: Collection<UsersDBType> = db.collection<UsersDBType>(SETTINGS.USERS_COLLECTION_NAME)
export const commentsCollection: Collection<CommentsDBType> = db.collection<CommentsDBType>(SETTINGS.COMMENTS_COLLECTION_NAME)
export const expiredTokensCollection: Collection<expiredTokenDBType> = db.collection<expiredTokenDBType>(SETTINGS.EXPIRED_TOKENS_COLLECTION_NAME)

export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}
