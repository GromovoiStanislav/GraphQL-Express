import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error(error);
    }
};

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${MONGODB_URI}`);
})