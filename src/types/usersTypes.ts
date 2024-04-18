export type InputUsersType = {
    login: string,
    password: string,
    email: string
}

export type OutputUsersType = {
    id?: string,
    email?: string,
    login?: string,
    createdAt: string
}
export type OutputPaginatedUsersType = {
    items: OutputUsersType[],
    totalCount: number,
    pagesCount: number,
    page: string,
    pageSize: string
}

export type UsersDBType = {
    id: string,
    userInfo: UserInfoType,
    userConfirmation: userConfirmationType,
    createdAt: string,
}

type userConfirmationType = {
    confirmed: boolean,
    confirmCode: string,
    expirationTime: Date
}

type UserInfoType = {
    email: string,
    login: string,
    hash: string,
    salt: string
}
