import Agenda, { Job, JobAttributesData } from "agenda";
import { MongoClient, ObjectId, Db } from "mongodb";
import sendMail from './nodemailer'

const mongoURI = "mongodb://localhost:27017";
const dbName = "emailScheduler";

const agenda = new Agenda({
    db: {
        address: mongoURI
    },
})

// defiine email job
agenda.define("send Email", async (job: Job<{ to: string; subject: string; text: string }>) => {
    const { to, subject, text } = job.attrs.data;
    // send email here
    await sendMail(to, subject, text)
    console.log(`Sending email to ${to} with subject ${subject} and body ${text}`);
})

// Connect to MongoDB and start processing jobs
const start = async (): Promise<void> => {
    try {
        const client: MongoClient = await MongoClient.connect(mongoURI);
        const db: any = client.db(dbName)
        agenda.mongo(db)
        // Start processing jobs
        await agenda.start();
        console.log('Agenda job processing started');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


interface Email {
    _id: string;
    to?: string;
    subject?: string;
    text?: string;
    scheduledTime: string | Date;
}

export const scheduleEmail = async (email: Email): Promise<void> => {
    try {
        await agenda.create("send Email", email).schedule(email.scheduledTime).save();
        console.log('Email scheduled:', email);
    } catch (error) {
        console.error('Error scheduling email:', error);
    }
};

// Reschedule an email
export const rescheduleEmail = async (emailId: string, newScheduledTime: Date): Promise<void> => {
    try {

        // Cancel the existing job
        await agenda.cancel({ _id: new ObjectId(emailId) });
        console.log("Email canceled:", emailId);
        // Schedule the email with the new scheduled time
        const email = {
            _id: emailId,
            scheduledTime: newScheduledTime
        };
        await scheduleEmail(email);
        console.log("Email rescheduled:", email);
    } catch (error) {
        console.error("Error rescheduling email:", error);
    }
};

// Delete a scheduled email
export const deleteScheduledEmail = async (emailId: string): Promise<void> => {
    try {
        await agenda.cancel({ 'data._id': emailId });
        console.log('Email canceled:', emailId);
    } catch (error) {
        console.error('Error deleting scheduled email:', error);
    }
};

// read mail by ID

export const readScheduledEmail = async (emailId: string): Promise<any | null> => {
    try {
        // Find the job with the specified ID
        const job = await agenda.jobs({ _id: emailId });

        if (job.length === 0) {
            console.log("Email not found:", emailId);
            return null;
        }

        // Extract the relevant information from the job
        const scheduledEmail = {
            id: job[0].attrs._id.toString(),
            to: job[0].attrs.data.to,
            subject: job[0].attrs.data.subject,
            scheduledTime: job[0].attrs.nextRunAt,
        };

        console.log("Email found:", scheduledEmail);
        return scheduledEmail;
    } catch (error) {
        console.error("Error reading scheduled email:", error);
        return null;
    }
};


export const listScheduledEmails = async (): Promise<JobAttributesData[]> => {
    try {
        const agenda = new Agenda();
        const jobs = await agenda.jobs({ name: "sendEmail" });
        const scheduledEmails = jobs.map((job) => job.attrs.data);

        console.log("Scheduled emails:", scheduledEmails);
        return scheduledEmails;
    } catch (error) {
        console.error("Error listing scheduled emails:", error);
        return [];
    }
};

export default { start };