import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {InputBlogType, UpdateBlogType} from "../src/types/blogsTypes";
import {ADMIN_AUTH} from "../src/middlewares/auth";
import {blogCollection, connectToDB} from "../src/db/mongo-db";
import {blogsRepository} from "../src/repositories/blogsRepository";
import {ObjectId} from "mongodb";

describe('/blogs', () => {
    beforeAll(async () => {
        await connectToDB()
    })
    it('should create blog', async () => {
        await blogCollection.drop()
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newBlog: InputBlogType = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'https://w1.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog)
            .expect(201)

        expect(res.body.name).toEqual(newBlog.name)
        expect(res.body.description).toEqual(newBlog.description)
    })
    it('should be name error', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newBlog: InputBlogType = {
            name: '',
            description: 'd1',
            websiteUrl: 'w1',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(2)
    })
    it('should get array', async () => {
        const res = await req.get(`${SETTINGS.PATH.BLOGS}`)
            .expect(200)

        expect(res.body.length).toBeGreaterThan(0)
    })
    it('should get empty array', async () => {
        await blogCollection.drop()
        const res = await req.get(`${SETTINGS.PATH.BLOGS}`)
            .expect(200)
        expect(res.body).toEqual([])
    })
    it('should find blog', async () => {
        await blogsRepository.createBlog({
            name: 'n1',
            description: 'd1',
            websiteUrl: 'https://w1.com',
        })
        const blogs = await blogsRepository.getBlogs()
        const id = blogs[0].id
        const res = await req
            .get(`${SETTINGS.PATH.BLOGS}/${id}`)
            .expect(200)

        expect(res.body.id).toEqual(blogs[0].id?.toString())
    })
    it('should update blog', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        await blogsRepository.createBlog({
            name: 'n1',
            description: 'd1',
            websiteUrl: 'https://w1.com',
        })
        const blogs = await blogsRepository.getBlogs()
        const id = blogs[0].id
        const updatedBlog: UpdateBlogType = {
            name: 't1',
            description: 'a1',
            websiteUrl: 'https://www.youtube.com/'
        }
        await req
            .put(`${SETTINGS.PATH.BLOGS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedBlog)
            .expect(204);
    })
    it('should not find blog to update', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const updatedVideo: UpdateBlogType = {
            name: 't1',
            description: 'a1',
            websiteUrl: 'https://www.youtube.com/watch'
        }
        const id = new ObjectId()
        await req
            .put(`${SETTINGS.PATH.BLOGS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedVideo)
            .expect(404)
    })
    it('should be error in input', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const updatedVideo: UpdateBlogType = {
            name: '',
            description: 'a1',
            websiteUrl: 'hgfhfgh'
        }
        const res = await req
            .put(`${SETTINGS.PATH.BLOGS}/2`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedVideo)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(2)
    })
    it('should delete blog', async () => {
        const blogs = await blogsRepository.getBlogs()
        const id = blogs[0].id
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        await req
            .delete(`${SETTINGS.PATH.BLOGS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('should not find video to delete', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const id = new ObjectId()
        await req
            .delete(`${SETTINGS.PATH.BLOGS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})
