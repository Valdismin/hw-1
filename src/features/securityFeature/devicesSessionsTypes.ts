import mongoose, {Model, ObjectId} from "mongoose";

export type devicesSessionsDBType = {
    deviceId: string,
    title: string,
    lastActiveDate: string,
    expiredAt: string,
    issuedAt: string,
    userId: ObjectId,
    ip: string
}

export type devicesSessionsReturnType = {
    deviceId: string,
    title: string,
    lastActiveDate: string,
    ip: string
}

const devicesSessionsSchema = new mongoose.Schema<devicesSessionsDBType>({
    deviceId: {type: String, required: true},
    title: {type: String, required: true},
    lastActiveDate: {type: String, required: true},
    expiredAt: {type: String, required: true},
    issuedAt: {type: String, required: true},
    userId: {type: mongoose.Schema.ObjectId, required: true},
    ip: {type: String, required: true}
})

type DevicesSessionsModel = Model<devicesSessionsDBType>;


export const DevicesSessionsModel = mongoose.model<devicesSessionsDBType, DevicesSessionsModel>('DevicesSessions', devicesSessionsSchema)
