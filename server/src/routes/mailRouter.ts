import express from 'express';
const mailRouter = express.Router();
import createController from '../controllers/createController';
import readMailController from '../controllers/Readmail';
import listMailController from '../controllers/listmailController'
import deleteController from '../controllers/deleteController'
import updateController from '../controllers/updateController'

mailRouter.post('/schedule-mail', createController)
mailRouter.get('/read/:id', readMailController)
mailRouter.get('/list', listMailController)
mailRouter.delete('/delete/:id', deleteController)
mailRouter.put('/update/:id', updateController)

export default mailRouter;