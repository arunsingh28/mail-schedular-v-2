import { Request, Response } from 'express';
import mailModel from '../models/mailModel';

const mailStatus = async (req: Request, res: Response) => {
    const isMail = await mailModel.find({ _id: req.params.id })
    if (isMail.length === 0) {
        return res.status(404).json({ error: 'Mail not found' })
    }else{
        return res.status(200).json(isMail)
    }
}


export default mailStatus