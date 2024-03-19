import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {InputPostType, UpdatePostType} from "../src/types/postsTypes";
import {ADMIN_AUTH} from "../src/middlewares/auth";
import {connectToDB, postCollection} from "../src/db/mongo-db";
import {ObjectId} from "mongodb";
import {blogsRepository} from "../src/repositories/blogsRepository";
import {postsRepository} from "../src/repositories/postsRepository";

describe('/blogs', () => {
    beforeAll(async () => {
        await connectToDB()
    })
    it('should create post', async () => {
        await blogsRepository.createBlog({
            name: 'n1',
            description: 'd1',
            websiteUrl: 'https://w1.com',
        })
        const blogs = await blogsRepository.getBlogs()
        const id = blogs[0]._id
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost: InputPostType = {
            title: 'New post',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: id!
        }
        const res = await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(201)
        expect(res.body.title).toEqual(newPost.title)
        expect(res.body.shortDescription).toEqual(newPost.shortDescription)
    })
    it('should be auth error on create post', async () => {
        const buff2 = Buffer.from("fjshdf", 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost: InputPostType = {
            title: 'New post',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: new ObjectId()
        }
        await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(401)
    })
    it('should be input error on create post', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost: InputPostType = {
            title: '',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: new ObjectId()
        }
        await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(400)
    })
    it('should get posts', async () => {
        await req.get(`${SETTINGS.PATH.POSTS}`)
            .expect(200)
    })
    it('should not get posts', async () => {
        await postCollection.drop()
        await req.get(`${SETTINGS.PATH.POSTS}`)
            .expect(404)

    })

    it('should get post by id', async () => {
        await blogsRepository.createBlog({
            name: 'n1',
            description: 'd1',
            websiteUrl: 'https://w1.com',
        })
        const blogs = await blogsRepository.getBlogs()
        const id = blogs[0]._id
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost: InputPostType = {
            title: 'New post',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: id!
        }

        await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(201)

        const posts = await postsRepository.getPosts()

        const res = await req.get(`${SETTINGS.PATH.POSTS}/${posts[0]._id}`)
            .expect(200)

    })
    it('should not get post by id', async () => {
        const id = new ObjectId()
        await req.get(`${SETTINGS.PATH.POSTS}/${id}`)
            .expect(404)
    })
    it('should update post', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')

        const posts = await postsRepository.getPosts()
        const updatedPost: UpdatePostType = {
            title: 'fsdfsdfdsf',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: new ObjectId()
        }

        await req
            .put(`${SETTINGS.PATH.POSTS}/${posts[0]._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(204)
    })
    it('should not find post to update', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const id = new ObjectId()
        const updatedVideo: UpdatePostType = {
            title: 'fsdfsdfdsf',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: new ObjectId()
        }
        await req
            .put(`${SETTINGS.PATH.POSTS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedVideo)
            .expect(404)
    })
    it('should be error in input', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const updatedVideo: UpdatePostType = {
            title: '',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: new ObjectId()
        }
        const res = await req
            .put(`${SETTINGS.PATH.POSTS}/2`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedVideo)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(1)
    })
    it('should delete post', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const posts = await postsRepository.getPosts()
        await req
            .delete(`${SETTINGS.PATH.POSTS}/${posts[0]._id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('should not find post to delete', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const id = new ObjectId()
        await req
            .delete(`${SETTINGS.PATH.POSTS}/${id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})
