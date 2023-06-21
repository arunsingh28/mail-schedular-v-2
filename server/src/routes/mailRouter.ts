import express from 'express';
const mailRouter = express.Router();
import createController from '../controllers/createController';
import listController from '../controllers/listController';
import readMailController from '../controllers/ReadmailController';
import deleteController from '../controllers/deleteController'
import updateController from '../controllers/updateController'

mailRouter.post('/create', createController)
mailRouter.get('/list', listController)
mailRouter.get('/read/:id', readMailController)
mailRouter.delete('/delete/:id', deleteController)
mailRouter.put('/update/:id', updateController)

export default mailRouter;