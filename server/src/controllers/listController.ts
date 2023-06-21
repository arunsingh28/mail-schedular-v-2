import { Request, Response } from "express";
import mailModel from "../models/mailModel";

const mailList = async (req: Request, res: Response) => {
    console.log('list fetch')
    try {
        const mails = await mailModel.find()
        return res.status(200).json(mails)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}

export default mailList