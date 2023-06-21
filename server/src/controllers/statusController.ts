import { Request, Response } from 'express';
import { listUnsentEmails } from '../services/agenda'

const mailStatus = async (req: Request, res: Response) => {
    try {
        const unsentEmails = await listUnsentEmails()
        return res.status(200).json({
            message: 'Unsent mail fetched',
            unsentEmails
        })
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}


export default mailStatus