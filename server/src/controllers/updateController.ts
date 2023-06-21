import { Request, Response } from "express";
import mailModel from "../models/mailModel";
import scheduleEmail from "../services/scheduler";

const mailUpdate = async (req: Request, res: Response) => {
    const { date, time } = req.body
    try {
        // find the mail by id
        const mail = await mailModel.findById(req.params.id)
        if (!mail) return res.status(404).json({ error: 'Mail not found' })
        // update the mail
        mail.date = date
        mail.time = time
        await mail.save()
        // Schedule mail
        scheduleEmail(mail.email, mail.subject, mail.body, new Date(`${date} ${time}`).getTime());
        // send response
        res.status(200).json({ message: 'Mail updated successfully' })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}


export default mailUpdate