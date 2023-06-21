import nodemailer from 'nodemailer'
import mailModel from '../models/mailModel'

import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    service: "hotmail",
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls:{
        ciphers:'SSLv3'
    }
})

const mailOptions = (to: string, subject: string, body: string) => {
    return {
        from: 'sms.798361@hotmail.com',
        to,
        subject,
        text: body
    }
}

transporter.verify().then(() => {
    console.log('Ready for send emails')
}).catch((error) => {
    console.log('error',error.message)
})

const sendMail = async (mail: string, subject: string, body: string) => {
    try {
        await transporter.sendMail(mailOptions(mail, subject, body))
        console.log('Email sent')
        // update status
        await mailModel.findOneAndUpdate({ email: mail }, { success: true }, { new: true })
    } catch (error:any) {
        console.log(error.message)
    }
}

export default sendMail