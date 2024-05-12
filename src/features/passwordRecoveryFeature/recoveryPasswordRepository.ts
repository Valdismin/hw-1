import {ObjectId} from "mongoose";
import {recoveryCodeDBType, RecoveryCodeModel} from "./recoveryCodeTypes";

export class RecoveryPasswordRepository {
    async addRecoveryCode(recoveryCode: string, userId: ObjectId, expiredAt: Date, isUsed: boolean) {
        const newRecoveryCode = new RecoveryCodeModel({recoveryCode, userId, expiredAt, isUsed})
        await newRecoveryCode.save()
    }

    async findRecoveryCode(recoveryCode: string): Promise<recoveryCodeDBType | null> {
        return RecoveryCodeModel.findOne({recoveryCode})
    }

    async updateRecoveryCode(recoveryCode: string, isUsed: boolean) {
        await RecoveryCodeModel.updateOne({recoveryCode}, {$set: {isUsed}})
    }
}
