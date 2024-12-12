// jobController.js

import Job from '../models/Job.js';
import scrapeTextContent from '../services/scraperService.js';
import generateSummary from '../services/summarizerService.js';
/**
 * Create a new job
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createJob = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Create a new job in the database with 'pending' status
        const job = await Job.create({ url });

        // Process the job asynchronously
        (async () => {
            try {
                const textContent = await scrapeTextContent(url);

                // Generate a summary using the LLM
                const summary = await generateSummary(textContent);
                // Update job with scraped content
                job.status = 'completed';
                job.summary = summary;
                await job.save();
            } catch (error) {
                job.status = 'failed';
                job.errorMessage = error.message;
                await job.save();
            }
        })();

        // Return initial response
        res.status(201).json({
            id: job._id,
            url: job.url,
            status: job.status,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
}

/**
 * Retrieve a job by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json({
            id: job._id,
            url: job.url,
            status: job.status,
            summary: job.summary,
            errorMessage: job.errorMessage,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
}

export { createJob, getJobById };
