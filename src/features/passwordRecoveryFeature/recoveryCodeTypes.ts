import mongoose from "mongoose";

export type recoveryCodeDBType = {
    recoveryCode: string
    isUsed: boolean
    userId: string
    expiredAt: Date
}

const recoveryCodeSchema = new mongoose.Schema<recoveryCodeDBType>({
    recoveryCode: {type: String, required: true},
    isUsed: {type: Boolean, required: true},
    userId: {type: String, required: true},
    expiredAt: {type: Date, required: true}
})

type RecoveryCodeModel = mongoose.Model<recoveryCodeDBType>;

export const RecoveryCodeModel = mongoose.model<recoveryCodeDBType, RecoveryCodeModel>('RecoveryCode', recoveryCodeSchema)
