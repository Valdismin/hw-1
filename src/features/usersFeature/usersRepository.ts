import {userConfirmationType, UsersDBType, UsersModel} from "./usersTypes";
import {injectable} from "inversify";

@injectable()
export class UsersRepository {
    async create(dto: UsersDBType): Promise<string> {
        const user = new UsersModel(dto);
        const result = await user.save();
        return result._id.toString()
    }
    async deleteUser(id: string): Promise<UsersDBType[]> {
        const result: any = await UsersModel.deleteOne({_id: id});
        if (result.deletedCount === 0) {
            return []
        }
        return UsersModel.find({})
    }
    async confirmUser(id: string): Promise<UsersDBType | null> {
        const result: any = await UsersModel.updateOne({_id: id}, {$set: {'userConfirmation.confirmed': true}});
        if (result.modifiedCount === 0) {
            return null
        }
        return UsersModel.findOne({id: id}, {projection: {'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
    async updateUserConfirmation(id: string, userConfirmation: userConfirmationType): Promise<UsersDBType | null> {
        const result: any = await UsersModel.updateOne({_id: id}, {$set: {userConfirmation:userConfirmation}});
        if (result.modifiedCount === 0) {
            return null
        }
        return UsersModel.findOne({_id: id}, {projection: {'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
    async getUserForAuth(loginOrEmail: string): Promise<string | null> {
        const result = await UsersModel.findOne({$or: [{'userInfo.login': loginOrEmail}, {'userInfo.email': loginOrEmail}]}).lean().exec();
        if (!result) {
            return null
        }
        return result._id.toString()
    }

    async getUserByConfirmCode(code: string): Promise<string | null> {
        const result = await UsersModel.findOne({'userConfirmation.confirmCode': code}).lean().exec();
        if (!result) {
            return null
        }
        return result._id.toString()
    }
    async updateUserPassword(id: string, hash: string, salt: string) {
        const result: any = await UsersModel.updateOne({_id: id}, {$set: {'userInfo.hash': hash, 'userInfo.salt': salt}});
        if (result.modifiedCount === 0) {
            return null
        }
        return UsersModel.findOne({_id: id}, {projection: {_id: 0, 'userInfo.hash': 0, 'userInfo.salt': 0}})
    }
}
