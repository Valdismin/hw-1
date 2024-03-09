import express from 'express'
import {videosRouter} from "./routers/videos";
import {testsRouter} from "./routers/testing";
import {blogsRouter} from "./routers/blogs";
import {postsRouter} from "./routers/posts";

export const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testsRouter)
