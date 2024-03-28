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
    email: string,
    login: string,
    createdAt: string,
    hash: string,
    salt: string
}
