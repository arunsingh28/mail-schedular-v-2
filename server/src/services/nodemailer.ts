import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    service: "hotmail",
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        ciphers: 'SSLv3'
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

// verify connection configuration
transporter.verify().then(() => {
    console.log('Ready for send emails')
}).catch((error) => {
    console.log('error', error.message)
})


// send email function
const sendMail = async (mail: string, subject: string, body: string) => {
    try {
        const info = await transporter.sendMail(mailOptions(mail, subject, body))
        console.log('Email sent', info.response)
    } catch (error: any) {
        console.log(error.message)
    }
}

export default sendMail