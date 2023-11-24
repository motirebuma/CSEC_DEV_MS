import mongoose, { Document, Model, Schema } from 'mongoose';

const { model } = mongoose;

interface IMessage {
    fullname: string;
    email: string;
    subject: string;
    message: string;
}

export interface IMessageDocument extends IMessage, Document {}

const MessageSchema: Schema<IMessageDocument> = new Schema<IMessageDocument>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const MessageModel: Model<IMessageDocument> = model<IMessageDocument>('Message', MessageSchema);

export default MessageModel;

