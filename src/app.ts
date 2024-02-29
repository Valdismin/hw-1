import express from 'express'
import {videosRouter} from "./routers/videos";
import {testsRouter} from "./routers/testing";

export const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})

app.use('/videos', videosRouter)
app.use('/videos', testsRouter)
