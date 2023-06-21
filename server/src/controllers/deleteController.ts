import { Request, Response } from 'express'
import { deleteScheduledEmail } from '../services/agenda'

const mailDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const isDelete = await deleteScheduledEmail(id)
        if (isDelete) {
            return res.status(200).json({
                message: 'Mail deleted'
            })
        }
        return res.status(404).json({
            message: 'Mail not found'
        })
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}

export default mailDelete