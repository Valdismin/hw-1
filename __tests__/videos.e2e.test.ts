import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import {db, setDB} from "../src/db/db";
import {dataset1, dataset2, dataset3} from "./datasets";
import {Resolutions} from "../src/config/video.config";
import {InputVideoType} from "../src/types";

describe('/videos', () => {
    beforeAll(async () => {
        await req.delete(`${SETTINGS.PATH.TESTING}/all-data`)
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(0)
    })
    it('should get not empty array', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    it('should create', async () => {
        setDB()
        const newVideo: InputVideoType = {
            title: 't1',
            author: 'a1',
            availableResolution: ["P144","Invalid","P720"]
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)

        expect(res.body.availableResolution).toEqual(newVideo.availableResolution)
        expect(res.body.title).toEqual(newVideo.title)
    })
    it('should be an error on create', async () => {
        setDB()
        const newVideo: InputVideoType = {
            title: '',
            author: 'a1',
            availableResolution: [Resolutions.P144]
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(1)
    })
    it('should find video', async () => {
        setDB(dataset2)
        const res = await req
            .get(`${SETTINGS.PATH.VIDEOS}/1`)
            .expect(200)

        expect(res.body).toEqual(dataset2.videos[0])
    })

    it('should not find video', async () => {
        setDB(dataset2)
        await req
            .get(`${SETTINGS.PATH.VIDEOS}/2`)
            .expect(404)
    })
    it('should update video', async () => {
        setDB(dataset3)
        const updatedVideo: InputVideoType = {
            title: 't1',
            author: 'a1',
            canBeDownloaded: true
        }

        await req
            .put(`${SETTINGS.PATH.VIDEOS}/2`)
            .send(updatedVideo)
            .expect(204)
    })
    it('should not find video to update', async () => {
        setDB(dataset3)
        const updatedVideo: InputVideoType = {
            title: 't1',
            author: 'a1'
        }
        await req
            .put(`${SETTINGS.PATH.VIDEOS}/221312`)
            .send(updatedVideo)
            .expect(404)
    })
    it('should be error in input', async () => {
        setDB(dataset3)
        const updatedVideo: InputVideoType = {
            title: '',
            author: 'a1'
        }
        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/2`)
            .send(updatedVideo)
            .expect(400)

        expect(res.body.errorsMessages.length).toBe(1)
    })
    it('should delete video', async () => {
        setDB(dataset3)

        await req
            .delete(`${SETTINGS.PATH.VIDEOS}/2`)
            .expect(204)
    })

    it('should not find video to delete', async () => {
        await req
            .delete(`${SETTINGS.PATH.VIDEOS}/2`)
            .expect(404)
    })
})
