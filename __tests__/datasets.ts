// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'
import {VideoDBType} from "../src/types/videosTypes";
import {Resolutions} from "../src/config/video.config";
import {BlogDBType} from "../src/types/blogsTypes";
import {PostDBType} from "../src/types/postsTypes";

export const video1: VideoDBType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P240],
}
export const video2: VideoDBType = {
    id: 1,
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P240],
}
export const video3: VideoDBType = {
    id: 2,
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P240],
}
export const blog1: BlogDBType = {
    id: '1',
    name: 'n' + Date.now() + Math.random(),
    description: 'd' + Date.now() + Math.random(),
    websiteUrl: 'w' + Date.now() + Math.random(),
}
export const blog2: BlogDBType = {
    id: '2',
    name: 'n' + Date.now() + Math.random(),
    description: 'd' + Date.now() + Math.random(),
    websiteUrl: 'w' + Date.now() + Math.random(),
}

export const post: PostDBType = {
    id: '1',
    title: 't' + Date.now() + Math.random(),
    shortDescription: 'sd' + Date.now() + Math.random(),
    content: 'c' + Date.now() + Math.random(),
    blogId: '1',
    blogName: 'n' + Date.now() + Math.random(),
}
export const post2: PostDBType = {
    id: '2',
    title: 't' + Date.now() + Math.random(),
    shortDescription: 'sd' + Date.now() + Math.random(),
    content: 'c' + Date.now() + Math.random(),
    blogId: '2',
    blogName: 'n' + Date.now() + Math.random(),
}


export const dataset1: DBType = {
    videos: [video1],
    blogs: [blog1],
    posts: [post],
}
export const dataset2: DBType = {
    videos: [video2],
    blogs: [blog2],
    posts: [post2],
}
export const dataset3: DBType = {
    videos: [video1, video2, video3],
    blogs: [],
    posts: [],
}
