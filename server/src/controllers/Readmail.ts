import { Request, Response } from "express";
import { readScheduledEmail } from '../services/agenda'


const readMail = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const mail = await readScheduledEmail(id)
        return res.status(201).json({
            mail
        })
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}


export default readMail