import mongoose, { Document, Model, Schema } from 'mongoose';

const { model } = mongoose;

interface IEvent {
    title: string;
    description: string;
    cover: string;
    date: string;
    time: string;
}

export interface IEventDocument extends IEvent, Document {}

const EventSchema: Schema<IEventDocument> = new Schema<IEventDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

const EventModel: Model<IEventDocument> = model<IEventDocument>('Event', EventSchema);

export default EventModel;

