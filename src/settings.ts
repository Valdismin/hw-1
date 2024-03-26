import dotenv from 'dotenv'
dotenv.config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing',
        BLOGS: '/blogs',
        POSTS: '/posts',
    },
    AUTH: {
        LOGIN: 'admin',
        PASSWORD: 'qwerty'
    },
    BLOG_COLLECTION_NAME: 'blogs',
    POST_COLLECTION_NAME: 'posts',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'test'
}
