import dotenv from 'dotenv'
dotenv.config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing',
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        SECURITY: '/security',
    },
    AUTH: {
        LOGIN: 'admin',
        PASSWORD: 'qwerty'
    },
    BLOG_COLLECTION_NAME: 'blogs',
    POST_COLLECTION_NAME: 'posts',
    USERS_COLLECTION_NAME: 'users',
    COMMENTS_COLLECTION_NAME: 'comments',
    EXPIRED_TOKENS_COLLECTION_NAME: 'expiredTokens',
    EXPIRED_RECOVERY_CODES_COLLECTION_NAME: 'expiredRecoveryCodes',
    API_USAGE_COLLECTION_NAME: 'apiUsage',
    AUTH_COLLECTION_NAME: 'auth',
    SECURITY_COLLECTION_NAME: 'security',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    JWT_SECRET: process.env.SECRET_KEY || 'secret',
    JWT_REFRESH_SECRET: process.env.REFRESH_SECRET_KEY || 'secretRefresh',
    DB_NAME: process.env.DB_NAME || 'test'
}
