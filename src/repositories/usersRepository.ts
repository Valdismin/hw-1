import {userCollection} from "../db/mongo-db";
import {usersService} from "../services/usersService";
import {InputUsersType, OutputUsersType} from "../types/usersTypes";

export const usersRepository = {
    async create(user: InputUsersType): Promise<OutputUsersType | null>{
        const matchedUser = await usersService.createUserService(user);
        await userCollection.insertOne(matchedUser);
        return userCollection.findOne({id: matchedUser.id}, {projection: {_id: 0, hash: 0, salt: 0}})
    },
    async deleteUser(id: string): Promise<OutputUsersType[]> {
        const result = await userCollection.deleteOne({id: id});
        if (result.deletedCount === 0) {
            return []
        }
        return userCollection.find({}, {projection: {_id: 0}}).toArray()
    }
}
