import {expiredTokensCollection} from "../db/mongo-db";
import {expiredTokenDBType} from "../types/tokensTypes";

export const refreshTokenRepository = {
    addToken: async (token: string) => {
      return  await expiredTokensCollection.insertOne({expiredToken: token})
    },
    checkToken: async (token: string): Promise<expiredTokenDBType | null> => {
        return await expiredTokensCollection.findOne({expiredToken:token})
    }
}
