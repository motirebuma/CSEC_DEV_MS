import mongoose, { Document, Model, Schema } from 'mongoose';

const { model } = mongoose;

interface IAdmin {
    username: string;
    password: string;
}

export interface IAdminDocument extends IAdmin, Document {}

const AdminSchema: Schema<IAdminDocument> = new Schema<IAdminDocument>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const AdminModel: Model<IAdminDocument> = model<IAdminDocument>('Admin', AdminSchema);

export default AdminModel;

