import express from 'express'
import { SERVER_PORT } from './constants/env.constants.js'
import { apiRouter } from './routers/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health-check', (req, res) => {
    return res.status(200).send(`Healthy`)
})

app.use('/api', apiRouter)

app.listen(SERVER_PORT, () => {
    console.log(`서버가 ${SERVER_PORT}포트에서 실행중입니다.`)
})