import mongoose, {Model} from "mongoose";

export type expiredTokenDBType = {
    expiredToken: string
}

const expiredTokensSchema = new mongoose.Schema<expiredTokenDBType>({
    expiredToken: {
        type: String,
        required: true
    }
})

type ExpiredTokensModel = Model<expiredTokenDBType>

export const ExpiredTokensModel = mongoose.model<expiredTokenDBType, ExpiredTokensModel>('expiredTokens', expiredTokensSchema)
