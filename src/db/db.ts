import {VideoDBType} from "../types/videosTypes";
import {BlogDBType} from "../types/blogsTypes";
import {PostDBType} from "../types/postsTypes";

export type DBType = {
    videos: VideoDBType[]
    blogs: BlogDBType[]
    posts: PostDBType[]
}

export const db: DBType = {
    videos: [],
    blogs: [],
    posts: [],
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        return
    }
    db.videos = dataset.videos || db.videos
}

export const setBlogsDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.blogs = []
        return
    }
    db.blogs = dataset.blogs || db.blogs
}
export const setPostsDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.posts = []
        return
    }
    db.posts = dataset.posts || db.posts
}
