import express from 'express';

import { createJob, getJobById } from '../controllers/jobController.js';
const router = express.Router();



// Create a new job
router.post('/jobs', createJob);

// Fetch a job by ID
router.get('/jobs/:id', getJobById);

export default router;
