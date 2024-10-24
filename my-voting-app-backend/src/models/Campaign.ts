import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  candidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }]
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', CampaignSchema);
export default Campaign;
