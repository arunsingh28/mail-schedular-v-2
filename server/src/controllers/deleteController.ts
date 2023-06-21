import { Request, Response } from 'express'
import { deleteScheduledEmail } from '../services/agenda'

const mailDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await deleteScheduledEmail(id).then(() => {
            console.log('Email deleted')
        }).catch((error) => {
            console.log('error', error)
        })
        return res.status(201).json({
            message: 'Mail deleted',
            mailId: id
        })
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}

export default mailDelete