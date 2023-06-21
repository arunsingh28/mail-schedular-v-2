import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
        }
    }
}

// connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected')
}).catch((err) => {
    console.log('MongoDB connection error:', err)
    process.exit(1)
})


export default mongoose.connection
