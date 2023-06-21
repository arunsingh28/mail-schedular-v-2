import { Request, Response } from 'express';
import { scheduleEmail } from '../services/agenda'



// Create a new mail with schedule time
const mailCreate = async (req: Request, res: Response) => {
    const { to, body, subject, date, time } = req.body
    try {
        const scheduledTime = new Date(`${date} ${time}`)
        const emailPayload = {
            to,
            subject,
            text: body,
            scheduledTime,
            // modify this to your needs
            _id: Date.now().toString(),
        }
        await scheduleEmail(emailPayload).then(() => {
            console.log('Email scheduled')
        }).catch((error) => {
            console.log('error', error)
        })
        return res.status(201).json({ 
            message: 'Mail scheduled',
            mailId: emailPayload._id,
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}




export default mailCreate