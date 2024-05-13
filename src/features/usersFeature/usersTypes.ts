import mongoose, {Model, ObjectId} from "mongoose";

const usersSchema = new mongoose.Schema<UsersDBType>({
        userInfo: {
            email: {type: String, required: true},
            login: {type: String, required: true},
            hash: {type: String},
            salt: {type: String}
        },
        userConfirmation: {
            confirmed: {type: Boolean, required: true},
            confirmCode: {type: String, required: true},
            expirationTime: {type: Date, required: true}
        },
        createdAt: {type: String, required: true}
    }
)

type UsersModel = Model<UsersDBType>

export const UsersModel = mongoose.model<UsersDBType, UsersModel>('Users', usersSchema)

export type InputUsersType = {
    login: string,
    password: string,
    email: string
}

export type OutputUsersType = {
    id: string,
    email?: string,
    login?: string,
    createdAt: string
}

export type OutputPaginatedUsersType = {
    items: OutputUsersType[],
    totalCount: number,
    pagesCount: number,
    page: string,
    pageSize: string
}

export type UserViewModelType = {
    id: string,
    userInfo: UserInfoType,
    userConfirmation: userConfirmationType,
    createdAt: string,
}

export type UsersDBType = {
    _id?: ObjectId,
    userInfo: UserInfoType,
    userConfirmation: userConfirmationType,
    createdAt: string,
}

export type userConfirmationType = {
    confirmed: boolean,
    confirmCode: string,
    expirationTime: Date
}

type UserInfoType = {
    email: string,
    login: string,
    hash?: string,
    salt?: string
}
