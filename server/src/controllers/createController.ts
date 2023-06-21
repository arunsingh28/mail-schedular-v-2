import { Request, Response } from 'express';
import mailModel from '../models/mailModel';
import scheduleEmail from '../services/scheduler';


// Create a new mail with schedule time
const mailCreate = async (req: Request, res: Response) => {
    const { name, email, body, subject, date, time } = req.body
    try {
        const mail = new mailModel({ name, email, body, date, time, subject })
        await mail.save()
        // Schedule mail
        scheduleEmail(email, subject, body, new Date(`${date} ${time}`).getTime());
        return res.status(201).json({ message: 'Mail created' })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}




export default mailCreate