import express from 'express'
import statusController from '../controllers/statusController'

const statusRouter = express.Router()

statusRouter.get('/', statusController)

export default statusRouter;