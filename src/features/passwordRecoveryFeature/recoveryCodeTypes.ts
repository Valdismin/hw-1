import {ObjectId} from "mongoose";

export type recoveryCodeDBType = {
    recoveryCode: string
    isUsed: boolean
    userId: ObjectId
    expiredAt: Date
}
