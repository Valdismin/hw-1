import {authCollection} from "../db/mongo-db";
import {authDBType} from "../types/authTypes";

export const authRepository = {
    async login(loginOrEmail: string): Promise<authDBType | null> {
        return await authCollection.findOne({loginOrEmail: loginOrEmail})

    }
}
