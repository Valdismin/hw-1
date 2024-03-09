import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {db, setBlogsDB, setPostsDB} from "../src/db/db";
import {dataset1, dataset2, dataset3} from "./datasets";
import {InputPostType, UpdatePostType} from "../src/types/postsTypes";
import {ADMIN_AUTH} from "../src/middlewares/auth";

describe('/blogs', () => {
    beforeAll(async () => {
        await req.delete(`${SETTINGS.PATH.TESTING}/all-data`)
    })

    it('should get posts', async () => {
        setPostsDB(dataset1)
        const res = await req.get(`${SETTINGS.PATH.POSTS}`)
            .expect(200)

        expect(res.body).toEqual(db.posts)
    })
    it('should not get posts', async () => {
        setPostsDB()
        await req.get(`${SETTINGS.PATH.POSTS}`)
            .expect(404)

    })

    it('should create post', async () => {
        setPostsDB(dataset1)
        setBlogsDB(dataset1)
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost:InputPostType = {
            title: 'New post',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: '1'
        }
        const res = await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(201)

        expect(res.body.title).toEqual(newPost.title)
        expect(res.body.shortDescription).toEqual(newPost.shortDescription)
    })
    it('should be auth error on create post', async () => {
        setPostsDB(dataset1)
        const buff2 = Buffer.from("fjshdf", 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost:InputPostType = {
            title: 'New post',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: '1'
        }
        await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(401)
    })
    it('should be input error on create post', async () => {
        setPostsDB(dataset1)
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const newPost:InputPostType = {
            title: '',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: '1'
        }
        await req.post(`${SETTINGS.PATH.POSTS}`)
            .send(newPost)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(400)
    })
    it('should get post by id', async () => {
        setPostsDB(dataset1)
        const res = await req.get(`${SETTINGS.PATH.POSTS}/1`)
            .expect(200)

        expect(res.body).toEqual(dataset1.posts[0])
    })
    it('should not get post by id', async () => {
        setPostsDB()
        await req.get(`${SETTINGS.PATH.POSTS}/4234`)
            .expect(404)
    })
    it('should update post', async () => {
        setPostsDB(dataset2)
        setBlogsDB(dataset2)
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const updatedPost: UpdatePostType = {
            title: 'fsdfsdfdsf',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: '2'
        }

        await req
            .put(`${SETTINGS.PATH.POSTS}/2`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(204)
    })
    it('should not find post to update', async () => {
        setPostsDB(dataset3)
        setBlogsDB(dataset2)
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const updatedVideo: UpdatePostType = {
            title: 'fsdfsdfdsf',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: '2'
        }
        await req
            .put(`${SETTINGS.PATH.POSTS}/221312`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedVideo)
            .expect(404)
    })
    it('should be error in input', async () => {
        setPostsDB(dataset2)
        setBlogsDB(dataset2)
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const updatedVideo: UpdatePostType = {
            title: '',
            shortDescription: 'New short description',
            content: 'New content',
            blogId: '2'
        }
        const res = await req
            .put(`${SETTINGS.PATH.POSTS}/2`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedVideo)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(1)
    })
    it('should delete blog', async () => {
        setPostsDB(dataset2)
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        await req
            .delete(`${SETTINGS.PATH.POSTS}/2`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)
    })
    it('should not find video to delete', async () => {
        setPostsDB()
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        await req
            .delete(`${SETTINGS.PATH.POSTS}/2`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(404)
    })
})
