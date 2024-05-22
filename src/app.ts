import "reflect-metadata";
import express from 'express'
import {blogsRouter} from "./features/blogFeature/blogsRouter";
import {postsRouter} from "./features/postsFeature/postsRouter";
import {testsRouter} from "./features/testingFeature/testingRouter";
import {usersRouter} from "./features/usersFeature/usersRouter";
import {authRouter} from "./features/authFeature/authRouter";
import {commentsRouter} from "./features/commentsFeature/commentsRouter";
import cookieParser from "cookie-parser";
import {securityRouter} from "./features/securityFeature/securityRouter";

export const app = express()
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', true)

app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})

app.use('/testing', testsRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)
app.use('/security', securityRouter)
