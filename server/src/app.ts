import express from 'express'
import dotenv from 'dotenv'
import mailRouter from './routes/mailRouter'
import mailStatus from './controllers/statusController'
import cors from 'cors'
import database from '../config/database'
dotenv.config()
const app = express()


app.use(cors())
app.use(express.json())

database

app.use('/', mailRouter)
app.use('/status/:id', mailStatus)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

