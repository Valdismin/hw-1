import {blogCollection, connectToDB} from "../src/db/mongo-db";
import {ADMIN_AUTH} from "../src/middlewares/auth";
import {InputBlogType} from "../src/features/blogFeature/blogsTypes";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";

describe('/auth', () => {
    beforeAll(async () => {
        await connectToDB()
    })
    it('should auth user', async () => {
        await req
            .post(SETTINGS.PATH.AUTH + '/login')
            .send({loginOrEmail: 'newUser2', password: '123456'})
            .expect(200)
    })
    it('should not login user', async () => {
        await req
            .post(SETTINGS.PATH.AUTH + '/login')
            .send({loginOrEmail: 'newUser23', password: '123456'})
            .expect(401)
    })
    it('should return user', async () => {
        await req
            .get(SETTINGS.PATH.AUTH + '/me')
            .set({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTI2MDM3MDY5MzUuMDIwOCIsImlhdCI6MTcxMjYwMzg2MiwiZXhwIjoxNzEyNjA3NDYyfQ.q6-0caoRGnABTFHMltK9xREprcfh6X4b_hinGAYh788'})
            .expect(200)
    })
})
