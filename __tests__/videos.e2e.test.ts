import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import {setDB} from "../src/db/db";
import {dataset1, dataset2, video2} from "./datasets";
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

        console.log(res.body)

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
            availableResolution: [Resolutions.P144]
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

        console.log(res.body)
        expect(res.body.errorsMessages.length).toBe(1)
    })
    it('should find video', async () => {
        await setDB({videos: [video2]})

        const res = await req
            .get(`${SETTINGS.PATH.VIDEOS}`)
            .query('2')
            .expect(200)

        expect(res.body[0]).toEqual(dataset2.videos[0])
    })
})
