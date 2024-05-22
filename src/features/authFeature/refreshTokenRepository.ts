import {expiredTokenDBType, ExpiredTokensModel} from "./tokensTypes";
import {injectable} from "inversify";

@injectable()
export class RefreshTokenRepository {
    async addToken(dto: string) {
        const token = new ExpiredTokensModel({expiredToken: dto})
        return await token.save()
    }

    async checkToken(token: string): Promise<expiredTokenDBType | null> {
        return ExpiredTokensModel.findOne({expiredToken: token})
    }
}
