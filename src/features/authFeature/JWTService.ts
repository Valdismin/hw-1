import jwt from 'jsonwebtoken';
import {SETTINGS} from "../../settings";
import {UsersDBType} from "../usersFeature/usersTypes";
import {uuid} from "uuidv4";
import {RefreshTokenRepository} from "./refreshTokenRepository";
import {ObjectId} from "mongoose";

export class JWTService {
    constructor(protected refreshTokenRepository: RefreshTokenRepository) {}
    createToken(user: UsersDBType) {
        return jwt.sign({
            id: user._id,
        }, SETTINGS.JWT_SECRET, {
            expiresIn: '30m'
        });
    }
    createRefreshToken(user: UsersDBType, deviceId?: string){
        const newDeviceId = deviceId || uuid()
        return jwt.sign({
            id: user._id,
            deviceId: newDeviceId,
        }, SETTINGS.JWT_REFRESH_SECRET, {
            expiresIn: '1h'
        });
    }
    getUserIdByToken(token: string) {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_SECRET);
            return decoded.id;
        } catch (e) {
            return null;
        }
    }
    getUserIdByRefreshToken(token: string) {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_REFRESH_SECRET);
            return decoded.id;
        } catch (e) {
            return null;
        }
    }
    getDeviceIdByRefreshToken(token: string) {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_REFRESH_SECRET);
            return decoded.deviceId;
        } catch (e) {
            return null;
        }
    }
    checkRefreshTokenExpire(token: string) {
        try {
            return this.refreshTokenRepository.checkToken(token)
        } catch (e) {
            return true;
        }
    }
    killRefreshToken(token: string)  {
        return this.refreshTokenRepository.addToken(token)
    }
    getFieldsForDeviceSession(token: string): {
        userId: ObjectId,
        deviceId: string,
        issuedAt: string,
        expiredAt: string
    } | null {
        try{
            const decoded: any = jwt.verify(token, SETTINGS.JWT_REFRESH_SECRET);
            return {
                userId: decoded.id,
                deviceId: decoded.deviceId,
                issuedAt: decoded.iat,
                expiredAt: decoded.exp
            }
        } catch (e) {
            return null
        }

    }
}
