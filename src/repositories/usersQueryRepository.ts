import {userCollection} from "../db/mongo-db";

export const usersQueryRepository = {
    async getAllUsers(query: any) {
        const searchLoginRegex = new RegExp(query.searchLoginTerm, 'i');
        const searchEmailRegex = new RegExp(query.searchEmailTerm, 'i');
        try {
            const items: any = await userCollection.find({
                $or: [
                    {login: searchLoginRegex},
                    {email: searchEmailRegex}
                ]
            }).project({_id: 0, hash: 0, salt: 0}).sort(
                query.sortBy,
                query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray()

            const c = await userCollection.countDocuments()

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
    }
}
