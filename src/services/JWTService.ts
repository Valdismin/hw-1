import jwt from 'jsonwebtoken';
import {SETTINGS} from "../settings";
import {UsersDBType} from "../types/usersTypes";
import {refreshTokenRepository} from "../repositories/refreshTokenRepository";

export const JWTService = {
    createToken: (user: UsersDBType) => {
        return jwt.sign({
            id: user.id,
        }, SETTINGS.JWT_SECRET, {
            expiresIn: '10s'
        });
    },
    createRefreshToken: (user: UsersDBType) => {
        return jwt.sign({
            id: user.id,
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
    checkRefreshTokenExpire: (token: string) => {
        try {
           return refreshTokenRepository.checkToken(token)
        } catch (e) {
            return true;
        }
    },
    killRefreshToken: (token: string) => {
        return refreshTokenRepository.addToken(token)
    }
}
