import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    summary: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default mongoose.model('Job', jobSchema);
