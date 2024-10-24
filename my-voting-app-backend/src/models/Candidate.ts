import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  votes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', CandidateSchema);
export default Candidate;
