import { Request, Response } from "express";
import mailModel from "../models/mailModel";

const readMail = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const mail = await mailModel.findOne({ _id: id })
        if (!mail) {
            return res.status(404).json({ error: 'Mail not found' })
        }
        return res.status(200).json(mail)
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}


export default readMail