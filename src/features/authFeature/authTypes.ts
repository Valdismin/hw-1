export type authDBType = {
    loginOrEmail: string,
    password: string,
    hash: string,
    salt: string
}

export type authMeType = {
    email?: string,
    login?: string,
    userId?: string
}
