import express from 'express'
import dotenv from 'dotenv'
import mailRouter from './routes/mailRouter'
import mailStatus from './controllers/statusController'
import cors from 'cors'
import startAgenda from './services/agenda'
dotenv.config()
const app = express()

// enable cors for accept requests
app.use(cors())
// parse json data
app.use(express.json())



app.use('/', mailRouter)
app.use('/status/:id', mailStatus)

// listen to port 4000
app.listen(process.env.PORT, () => {
    // start agenda
    startAgenda.start().catch((error) => {
        console.log('agenda error', error)
    })
    console.log(`Server is running on port ${process.env.PORT}`)
})

