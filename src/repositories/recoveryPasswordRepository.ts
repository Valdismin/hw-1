import {expiredRecoveryCodesCollection} from "../db/mongo-db";

export const recoveryPasswordRepository = {
    addRecoveryCode: async (recoveryCode: string, userId: string, expiredAt: Date, isUsed: boolean) => {
       await expiredRecoveryCodesCollection.insertOne({recoveryCode, userId, expiredAt, isUsed})
    },
    findRecoveryCode: async (recoveryCode: string) => {
        return await expiredRecoveryCodesCollection.findOne({recoveryCode})
    },
    updateRecoveryCode: async (recoveryCode: string, isUsed: boolean) => {
        await expiredRecoveryCodesCollection.updateOne({recoveryCode}, {$set: {isUsed}})
    }
}
