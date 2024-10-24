import { Router } from 'express';
import { voteForCandidate, getResultsByCampaign } from '../controllers/voteController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/vote', verifyToken, voteForCandidate);
router.get('/results/:campaignId', verifyToken, getResultsByCampaign);

export default router;
