import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB } = process.env;

const ConnectToDB = () => {
    if(!MONGODB){
        throw new Error('Mongodb secret key not found in .env file!')
    }
    // connect to mongodb
    mongoose.connect(MONGODB)
    .then(() => {
        console.log("Successfully connected to database");
    })

    .catch((error) => {
        console.log("database connection failed..");
        console.error(error);
        process.exit(1);
    });
};

export default ConnectToDB