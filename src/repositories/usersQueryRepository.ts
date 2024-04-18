import {userCollection} from "../db/mongo-db";

export const usersQueryRepository = {
    async getAllUsers(query: any) {
        const searchConditions = [];

        if (query.searchLoginTerm) {
            const searchLoginRegex = new RegExp(query.searchLoginTerm, 'i');
            searchConditions.push({login: searchLoginRegex});
        }

        if (query.searchEmailTerm) {
            const searchEmailRegex = new RegExp(query.searchEmailTerm, 'i');
            searchConditions.push({email: searchEmailRegex});
        }

        const findQuery = searchConditions.length ? {$or: searchConditions} : {};

        try {
            const items: any = await userCollection.find(findQuery).project({_id: 0, hash: 0, salt: 0}).sort(
                query.sortBy,
                query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray()

            const c = await userCollection.countDocuments(findQuery)

            return {
                items,
                totalCount: c,
                pagesCount: Math.ceil(c / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize
            }
        } catch (e) {
            return undefined
        }
    },
    async getUserForAuth(loginOrEmail: string) {
        return await userCollection.findOne({$or: [{'userInfo.login': loginOrEmail}, {'userInfo.email': loginOrEmail}]})
    },
    async getUserById(id: string) {
        return await userCollection.findOne({id: id}, {projection: {_id: 0, hash: 0, salt: 0, createdAt: 0}})
    },
    async getUserByConfirmCode(code: string) {
        return await userCollection.findOne({'userConfirmation.confirmCode': code})
    }
}
