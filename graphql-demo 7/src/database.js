import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true
        })
        console.log('>>> DB is connected');
    } catch {
        console.log('Something goes wrong!');
    }
}