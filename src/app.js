import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
// Load environment variables
dotenv.config();
// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', jobRoutes);

// Placeholder for health check
app.get('/', (req, res) => {
  res.send('Web Scraping Summary Service is running!');
});

export default app;
