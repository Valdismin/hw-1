import {userCollection} from "../../db/mongo-db";
import {OutputUsersType, userConfirmationType, UsersDBType, UsersModel} from "./usersTypes";
import {ObjectId} from "mongoose";

export class UsersRepository {
    async create(dto: UsersDBType): Promise<UsersDBType | null> {
        const user = new UsersModel(dto);
        return await user.save();
    }
    async deleteUser(id: ObjectId): Promise<OutputUsersType[]> {
        const result: any = await UsersModel.deleteOne({_id: id});
        if (result.deletedCount === 0) {
            return []
        }
        return UsersModel.find({})
    }
    async confirmUser(id: ObjectId): Promise<OutputUsersType | null> {
        const result: any = await UsersModel.updateOne({_id: id}, {$set: {'userConfirmation.confirmed': true}});
        if (result.modifiedCount === 0) {
            return null
        }
        return userCollection.findOne({id: id}, {projection: {'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
    async updateUserConfirmation(id: ObjectId, userConfirmation: userConfirmationType): Promise<OutputUsersType | null> {
        const result: any = await UsersModel.updateOne({_id: id}, {$set: {userConfirmation:userConfirmation}});
        if (result.modifiedCount === 0) {
            return null
        }
        return UsersModel.findOne({_id: id}, {projection: {'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
    async getUserForAuth(loginOrEmail: string): Promise<UsersDBType | null> {
        return UsersModel.findOne({$or: [{'userInfo.login': loginOrEmail}, {'userInfo.email': loginOrEmail}]})
    }
    async getUserById(id: ObjectId): Promise<UsersDBType | null> {
        return UsersModel.findOne({_id: id}, {projection: {'userInfo.hash': 0, 'userInfo.salt': 0, createdAt: 0}}).lean().exec()
    }
    async getUserByConfirmCode(code: string): Promise<UsersDBType | null> {
        return UsersModel.findOne({'userConfirmation.confirmCode': code})
    }
    async updateUserPassword(id: ObjectId, hash: string, salt: string) {
        const result: any = await UsersModel.updateOne({_id: id}, {$set: {'userInfo.hash': hash, 'userInfo.salt': salt}});
        if (result.modifiedCount === 0) {
            return null
        }
        return UsersModel.findOne({_id: id}, {projection: {_id: 0, 'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
}
