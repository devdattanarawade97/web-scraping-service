import mongoose from 'mongoose';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Connects to the MongoDB database using Mongoose.
 * Utilizes environment variables for connection URI.
 * Logs successful connection or any connection errors
 * using the Winston logging library.
 * Exits the process with a failure code if connection fails.
 */
const connectDB = async () => {
    try {
        console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    winston.info('Connected to MongoDB');
  } catch (error) {
    winston.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
