import { Router } from 'express';
import { addCandidate, getCandidatesByCampaign } from '../controllers/candidateController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/candidates', verifyToken, addCandidate);
router.get('/candidates/:campaignId', verifyToken, getCandidatesByCampaign);

export default router;
