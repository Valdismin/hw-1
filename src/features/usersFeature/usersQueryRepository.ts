import {OutputPaginatedUsersType, UsersDBType, UsersModel} from "./usersTypes";
import {sanitizeUser} from "../../utils/helpers";

export class UsersQueryRepository {
    async getAllUsers(query: any): Promise<OutputPaginatedUsersType | undefined> {
        const searchConditions = [];

        if (query.searchLoginTerm) {
            const searchLoginRegex = new RegExp(query.searchLoginTerm, 'i');
            searchConditions.push({'userInfo.login': searchLoginRegex});
        }

        if (query.searchEmailTerm) {
            const searchEmailRegex = new RegExp(query.searchEmailTerm, 'i');
            searchConditions.push({'userInfo.email': searchEmailRegex});
        }

        const findQuery = searchConditions.length ? {$or: searchConditions} : {};

        try {
            const items: any = await UsersModel.find(findQuery).sort({[query.sortBy]: query.sortDirection})
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)

            let mappedItems = items.map((item: UsersDBType) => {
                return sanitizeUser(item)
            })

            const c = await UsersModel.countDocuments(findQuery).exec();

            return {
                items:mappedItems,
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
