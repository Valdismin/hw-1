import express from 'express'
import {blogsRouter} from "./routers/blogs";
import {postsRouter} from "./routers/posts";
import {testsRouter} from "./routers/testing";
import {usersRouter} from "./routers/users";
import {authRouter} from "./routers/auth";
import {commentsRouter} from "./routers/comments";

export const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})

app.use('/testing', testsRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)
