import {DevicesSessionsModel} from "./devicesSessionsTypes";

export class SecurityQueryRepository {
    async getDevicesSessions(userId: string) {
        const sessions = await DevicesSessionsModel.find({userId: userId}).lean().exec()

        return sessions.map(session => {
            return {
                deviceId: session.deviceId,
                title: session.title,
                lastActiveDate: session.lastActiveDate,
                ip: session.ip
            }
        })
    }
}
