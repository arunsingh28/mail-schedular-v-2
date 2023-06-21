import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IMail extends mongoose.Document {
    name: string;
    email: string;
    body: string;
    subject: string;
    time: string;
    date: Date;
}

export const MailSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    email: {
        type: String,
        required: 'Enter an email',
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    body: {
        type: String,
        required: 'Enter a body'
    },
    date: {
        type: Date,
    },
    time: {
        type: String
    },
    subject: {
        type: String
    },
    success: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

export default mongoose.model<IMail>('Mail', MailSchema);
