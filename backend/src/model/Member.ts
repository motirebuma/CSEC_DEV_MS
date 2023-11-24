import mongoose, { Document, Model, Schema } from 'mongoose';

const { model } = mongoose;

interface IMember {
    fullname: string;
    email: string;
    department: string;
    password: string;
    gender: string;
    year: string;
}

export interface IMemberDocument extends IMember, Document {}

const MemberSchema: Schema<IMemberDocument> = new Schema<IMemberDocument>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const MemberModel: Model<IMemberDocument> = model<IMemberDocument>('Member', MemberSchema);

export default MemberModel;

