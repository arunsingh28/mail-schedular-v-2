import { Request, Response } from "express";
import { listScheduledEmails } from '../services/agenda'


const listMail = async (req: Request, res: Response) => {
    try {
        const scheduledEmails = await listScheduledEmails()
        return res.status(200).json({
            message: 'All mail fetched',
            scheduledEmails
        })
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}


export default listMail