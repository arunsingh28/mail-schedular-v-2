import express from 'express'
import dotenv from 'dotenv'
import mailRouter from './routes/mailRouter'
import mailStatus from './controllers/statusController'
import cors from 'cors'
import database from '../config/database'
dotenv.config()
const app = express()

// enable cors for accept requests
app.use(cors())
// parse json data
app.use(express.json())

// connect to database
database

app.use('/', mailRouter)
app.use('/status/:id', mailStatus)

// listen to port 4000
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

