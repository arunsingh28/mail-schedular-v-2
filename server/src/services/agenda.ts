import Agenda, { Job, JobAttributesData } from "agenda";
import { MongoClient, ObjectId } from "mongodb";
import sendMail from './nodemailer'

const mongoURI = "mongodb://localhost:27017";
const dbName = "emailScheduler";

const agenda = new Agenda({
    db: {
        address: mongoURI
    },
})

// defiine email job
agenda.define("sendEmail", async (job: Job<{ to: string; subject: string; text: string, sent?: boolean }>) => {
    const { to, subject, text } = job.attrs.data;
    // send email here
    await sendMail(to, subject, text)
    job.attrs.data.sent = true;
    await job.save();
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
    _id?: string;
    to?: string;
    subject?: string;
    text?: string;
    scheduledTime: string | Date;
    send?: boolean;
}

export const scheduleEmail = async (email: Email): Promise<void> => {
    try {
        await agenda.create("sendEmail", {
            ...email,
            sent: false,
        }).schedule(email.scheduledTime).save();
        console.log('Email scheduled:', email);
    } catch (error) {
        console.error('Error scheduling email:', error);
    }
};

// Reschedule an email
export const rescheduleEmail = async (emailId: string, newScheduledTime: Date): Promise<boolean> => {
    try {
        // fetch mail by id
        const job = await agenda.jobs();
        const filterEmail = job.filter((job) => job.attrs.data._id === emailId);
        // Cancel the existing job
        await agenda.cancel({ 'data._id': emailId });
        // Schedule the email with the new scheduled time
        const email = {
            ...filterEmail[0].attrs.data,
            sent: false,
            scheduledTime: newScheduledTime
        };
        await scheduleEmail(email);
        return true
    } catch (error) {
        console.error("Error rescheduling email:", error);
        return false
    }
};

// Delete a scheduled email
export const deleteScheduledEmail = async (emailId: string): Promise<boolean> => {
    try {
        const job = await agenda.jobs();
        const filterEmail = job.filter((job) => job.attrs.data._id === emailId);
        if (filterEmail.length === 0) {
            return false
        }
        await agenda.cancel({ 'data._id': emailId });
        console.log("Email canceled:", emailId);
        return true
    } catch (error) {
        console.error('Error deleting scheduled email:', error);
        return false
    }
};

// read mail by ID
export const readScheduledEmail = async (emailId: string): Promise<any | null> => {
    try {
        // Find the job with the specified ID
        const job = await agenda.jobs();
        const filterEmail = job.filter((job) => job.attrs.data._id === emailId);
        console.log("Scheduled email:", filterEmail);
        // Return the job data
        return filterEmail
    } catch (error) {
        console.error("Error reading scheduled email:", error);
        return null;
    }
};


// fetch all the scheduled emails
export const listScheduledEmails = async (): Promise<Email[]> => {
    try {
        const jobs = await agenda.jobs({ name: "sendEmail" });
        const scheduledEmails: any = jobs.map((job) => job.attrs.data);
        return scheduledEmails;
    } catch (error) {
        console.error("Error listing scheduled emails:", error);
        return [];
    }
};

// fetch all the unsent emails
export const listUnsentEmails = async (): Promise<JobAttributesData[]> => {
    try {
        const unsentQueuedJobs = await agenda.jobs({
            name: "sendEmail",
            "data.sent": false, // Unsucceeded emails
        });

        const unsentQueuedEmails = unsentQueuedJobs.map((job) => job.attrs.data);

        console.log("Unsent queued emails:", unsentQueuedEmails);
        return unsentQueuedEmails;
    } catch (error) {
        console.error("Error listing unsent emails:", error);
        return [];
    }
};

export default { start };