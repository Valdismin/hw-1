import {userCollection} from "../db/mongo-db";
import {OutputUsersType, userConfirmationType, UsersDBType} from "../types/usersTypes";

export const usersRepository = {
    async create(user: UsersDBType): Promise<UsersDBType | null> {
        await userCollection.insertOne(user);
        return userCollection.findOne({id: user.id}, {projection: {_id: 0,'userInfo.hash': 0, 'userInfo.salt': 0}})
    },
    async deleteUser(id: string): Promise<OutputUsersType[]> {
        const result = await userCollection.deleteOne({id: id});
        if (result.deletedCount === 0) {
            return []
        }
        return userCollection.find({}, {projection: {_id: 0}}).toArray()
    },
    async confirmUser(id: string): Promise<OutputUsersType | null> {
        const result = await userCollection.updateOne({id: id}, {$set: {'userConfirmation.confirmed': true}});
        if (result.modifiedCount === 0) {
            return null
        }
        return userCollection.findOne({id: id}, {projection: {_id: 0, 'userInfo.hash': 0, 'userInfo.salt': 0}})
    },
    async updateUserConfirmation(id: string, userConfirmation: userConfirmationType): Promise<OutputUsersType | null> {
        const result = await userCollection.updateOne({id: id}, {$set: {userConfirmation:userConfirmation}});
        if (result.modifiedCount === 0) {
            return null
        }
        return userCollection.findOne({id: id}, {projection: {_id: 0, 'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
}
