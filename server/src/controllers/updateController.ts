import { Request, Response } from "express";
import { rescheduleEmail } from '../services/agenda'

const mailUpdate = async (req: Request, res: Response) => {
    const { date, time } = req.body
    try {
        // find the mail by id
        const mailId = req.params.id
        const newScheduledTime = new Date(`${date} ${time}`)
        await rescheduleEmail(mailId, newScheduledTime).then(() => {
            console.log('Email rescheduled')
        }).catch((error) => {
            console.log('error', error)
        })
        return res.status(201).json({
            message: 'Mail rescheduled',
            mailId
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}


export default mailUpdate