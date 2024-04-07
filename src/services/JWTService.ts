import jwt from 'jsonwebtoken';
import {SETTINGS} from "../settings";
import {UsersDBType} from "../types/usersTypes";

export const JWTService = {
    createToken: (user: UsersDBType) => {
        return jwt.sign({
            id: user.id,
        }, SETTINGS.JWT_SECRET, {
            expiresIn: '1h'
        });
    },
    getUserIdByToken: (token: string) => {
        try {
            const decoded: any = jwt.verify(token, SETTINGS.JWT_SECRET);
            return decoded.id;
        } catch (e) {
            return null;
        }
    }
}
