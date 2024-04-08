import {blogCollection, connectToDB} from "../src/db/mongo-db";
import {ADMIN_AUTH} from "../src/middlewares/auth";
import {InputBlogType} from "../src/types/blogsTypes";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";

describe('/auth', () => {
    beforeAll(async () => {
        await connectToDB()
    })
    it('should auth user', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        await req
            .post(SETTINGS.PATH.AUTH + '/login')
            .send({loginOrEmail: 'newUser2', password: '123456'})
            .expect(200)
    })

})
