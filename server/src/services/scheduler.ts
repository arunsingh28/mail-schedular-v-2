import sendMail from './nodemailer';
import mailModel from '../models/mailModel';


async function scheduleEmail(emailId: string, subject: string, body: string, scheduledTime: number) {
    const currentTime = new Date().getTime();
    const delay = scheduledTime - currentTime;
    if (delay <= 0) {
        sendMail(emailId, subject, body);
        // update success status
       await mailModel.updateOne({ email: emailId }, { $set: { status: true } });
    } else {
        setTimeout(async () => {
            sendMail(emailId, subject, body);
            // update success status
            await mailModel.updateOne({ email: emailId }, { $set: { status: true } });
        }, delay);
    }
}

export default scheduleEmail;