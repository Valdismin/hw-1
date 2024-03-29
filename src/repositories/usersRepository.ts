import {userCollection} from "../db/mongo-db";
import {OutputUsersType, UsersDBType} from "../types/usersTypes";

export const usersRepository = {
    async create(user: UsersDBType): Promise<OutputUsersType | null>{
        await userCollection.insertOne(user);
        return userCollection.findOne({id: user.id}, {projection: {_id: 0, hash: 0, salt: 0}})
    },
    async deleteUser(id: string): Promise<OutputUsersType[]> {
        const result = await userCollection.deleteOne({id: id});
        if (result.deletedCount === 0) {
            return []
        }
        return userCollection.find({}, {projection: {_id: 0}}).toArray()
    }
}
