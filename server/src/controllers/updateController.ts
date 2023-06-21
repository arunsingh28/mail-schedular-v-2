import { Request, Response } from "express";
import { rescheduleEmail } from '../services/agenda'

const mailUpdate = async (req: Request, res: Response) => {
    const { date, time } = req.body
    try {
        // find the mail by id
        const mailId = req.params.id
        const newScheduledTime = new Date(`${date} ${time}`)
        const idDone = await rescheduleEmail(mailId, newScheduledTime)
        if (idDone) {
            res.status(200).json({ message: 'Email rescheduled', id: mailId })
        }
        else {
            res.status(404).json({ error: 'Email not found' })
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}


export default mailUpdate