import {VideoDBType} from "../types/videosTypes";
import {BlogDBType} from "../types/blogsTypes";

export type DBType = {
    videos: VideoDBType[]
    blogs: BlogDBType[]
}

export const db: DBType = {
    videos: [],
    blogs: [],
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
