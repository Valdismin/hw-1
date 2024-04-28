import jwt from 'jsonwebtoken';
import {SETTINGS} from "../settings";
import {UsersDBType} from "../types/usersTypes";
import {refreshTokenRepository} from "../repositories/refreshTokenRepository";
import {uuid} from "uuidv4";

export const JWTService = {
    createToken: (user: UsersDBType) => {
        return jwt.sign({
            id: user.id,
        }, SETTINGS.JWT_SECRET, {
            expiresIn: '10s'
        });
    },
    createRefreshToken: (user: UsersDBType) => {
        const deviceId = uuid()
        return jwt.sign({
            id: user.id,
            deviceId: deviceId,
        }, SETTINGS.JWT_REFRESH_SECRET, {
            expiresIn: '20s'
        });
    },
    getUserIdByToken: (token: string) => {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_SECRET);
            return decoded.id;
        } catch (e) {
            return null;
        }
    },
    getUserIdByRefreshToken: (token: string) => {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_REFRESH_SECRET);
            return decoded.id;
        } catch (e) {
            return null;
        }
    },
    getDeviceIdByRefreshToken: (token: string) => {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_REFRESH_SECRET);
            return decoded.deviceId;
        } catch (e) {
            return null;
        }
    },
    checkRefreshTokenExpire: (token: string) => {
        try {
            return refreshTokenRepository.checkToken(token)
        } catch (e) {
            return true;
        }
    },
    killRefreshToken: (token: string) => {
        return refreshTokenRepository.addToken(token)
    },
    getFieldsForDeviceSession: (token: string): {
        userId: string,
        deviceId: string,
        issuedAt: string,
        expiredAt: string
    } | null => {
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
