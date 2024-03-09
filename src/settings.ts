import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing',
        BLOGS: '/blogs',
    },
    AUTH: {
        LOGIN: 'admin',
        PASSWORD: 'qwerty'
    }
}
