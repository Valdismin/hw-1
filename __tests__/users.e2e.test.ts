import {connectToDB} from "../src/db/mongo-db";
import {req} from "./test-helpers";
import {SETTINGS} from "../src/settings";
import {ADMIN_AUTH} from "../src/middlewares/auth";

describe('/users', () => {
    beforeAll(async () => {
        await connectToDB()
    })
    it('should create user', async () => {
        const newUser = {
            email: 'fsdnfmds@gmail.com',
            password: '123456',
            login: 'newUser2'
        }
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const res = await req.post(`${SETTINGS.PATH.USERS}`)
            .send(newUser)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(201)
        expect(res.body.email).toEqual(newUser.email)
        expect(res.body.login).toEqual(newUser.login)
    })
    it('should be input error on create user', async () => {
        const newUser = {
            email: 'fsdnfmds@gmail.com',
            password: '12345',
            login: 'newUser'
        }
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        await req.post(`${SETTINGS.PATH.USERS}`)
            .send(newUser)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(400)
    })
    it('should be unauthorized on create user', async () => {
        const newUser = {
            email: 'fsdnfmds@gmail.com',
            password: '123456',
            login: 'newUser'
        }
        await req.post(`${SETTINGS.PATH.USERS}`)
            .send(newUser)
            .expect(401)
    })
    it('should get user', async () => {
        const newUser = {
            searchLoginTerm: 'newUser'
        }
        const res = await req.get(`${SETTINGS.PATH.USERS}`)
            .query(newUser)
            .expect(200)

        expect(res.body.items[0].login).toEqual(newUser.searchLoginTerm)
    })
    it('should get user without queries', async () => {
        const res = await req.get(`${SETTINGS.PATH.USERS}`)
            .expect(200)
        console.debug(res.body)
    })
    it('should delete user', async () => {
        const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        const codedAuth = buff2.toString('base64')
        const res = await req.delete(`${SETTINGS.PATH.USERS}/1711663489980.572`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .expect(204)

    })
    it('should login user', async () => {
        await req.post(`${SETTINGS.PATH.AUTH}/login`)
            .send({loginOrEmail: 'newUser2', password: '123456444'})
            .expect(204)

    })
})
