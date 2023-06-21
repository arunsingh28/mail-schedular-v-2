import { Request, Response } from 'express'
import mailModel from '../models/mailModel'

const mailDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const isDelete = await mailModel.deleteOne({ _id: id })
        if (isDelete.deletedCount === 0) {
            return res.status(404).json({ error: 'Mail not found' })
        } else {
            return res.status(200).json({ message: 'Mail deleted' })
        }
    }
    catch (error: any) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' })
    }
}

export default mailDelete