import express from 'express'
import {blogsRouter} from "./routers/blogs";
import {postsRouter} from "./routers/posts";
import {testsRouter} from "./routers/testing";

export const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})

app.use('/testing', testsRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
