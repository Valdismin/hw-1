import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {setBlogsDB, setDB} from "../src/db/db";
import {dataset1, dataset2, dataset3} from "./datasets";
import {InputBlogType, UpdateBlogType} from "../src/types/blogsTypes";

describe('/blogs', () => {
    beforeAll(async () => {
        await req.delete(`${SETTINGS.PATH.TESTING}/all-data`)
    })

    it('should get array', async () => {
        setBlogsDB(dataset1)
        const res = await req.get(`${SETTINGS.PATH.BLOGS}`)
            .expect(200)

        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.blogs[0])
    })
    it('should get empty array', async () => {
        setBlogsDB()
        const res = await req.get(`${SETTINGS.PATH.BLOGS}`)
            .expect(200)

        expect(res.body).toEqual([])
    })
    it('should create blog', async () => {
        setBlogsDB()
        const newBlog: InputBlogType = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'w1',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .send(newBlog)
            .expect(201)

        expect(res.body.name).toEqual(newBlog.name)
        expect(res.body.description).toEqual(newBlog.description)
    })
    it('should be name error', async () => {
        setBlogsDB()
        const newBlog: InputBlogType = {
            name: '',
            description: 'd1',
            websiteUrl: 'w1',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .send(newBlog)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(1)
        expect(res.body.errorsMessages[0].field).toBe('name')
    })
    it('should find blog', async () => {
        setBlogsDB(dataset2)
        const res = await req
            .get(`${SETTINGS.PATH.BLOGS}/2`)
            .expect(200)

        expect(res.body).toEqual(dataset2.blogs[0])
    })

    it('should not find video', async () => {
        setBlogsDB(dataset2)
        await req
            .get(`${SETTINGS.PATH.VIDEOS}/1`)
            .expect(404)
    })
    it('should update blog', async () => {
        setBlogsDB(dataset2)
        const updatedBlog: UpdateBlogType = {
            name: 't1',
            description: 'a1',
            websiteUrl: 'https://www.youtube.com/watch?v=6Ejga4kJUts'
        }

        await req
            .put(`${SETTINGS.PATH.BLOGS}/2`)
            .send(updatedBlog)
            .expect(204)
    })
    it('should not find blog to update', async () => {
        setBlogsDB(dataset3)
        const updatedVideo: UpdateBlogType = {
            name: 't1',
            description: 'a1',
            websiteUrl: 'https://www.youtube.com/watch?v=6Ejga4kJUts'
        }
        await req
            .put(`${SETTINGS.PATH.BLOGS}/221312`)
            .send(updatedVideo)
            .expect(404)
    })
    it('should be error in input', async () => {
        setBlogsDB(dataset2)
        const updatedVideo: UpdateBlogType = {
            name: '',
            description: 'a1',
            websiteUrl: 'hgfhfgh'
        }
        const res = await req
            .put(`${SETTINGS.PATH.BLOGS}/2`)
            .send(updatedVideo)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(1)
    })
    it('should delete blog', async () => {
        setBlogsDB(dataset2)

        await req
            .delete(`${SETTINGS.PATH.BLOGS}/2`)
            .expect(204)
    })

    it('should not find video to delete', async () => {
        setBlogsDB()
        await req
            .delete(`${SETTINGS.PATH.BLOGS}/2`)
            .expect(404)
    })
})
