import mongoose from "mongoose";

export const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to database ${mongoose.connection.host}`.bgCyan);
    }
    catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1); // Exit the process if connection fails
    }
}

