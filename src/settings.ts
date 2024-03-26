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
    MONGO_URL: 'mongodb+srv://valdismin:Vl281296vO@cluster0.yepohjo.mongodb.net/express-homework?retryWrites=true&w=majority&appName=Cluster0',
    DB_NAME: process.env.DB_NAME || 'test'
}
