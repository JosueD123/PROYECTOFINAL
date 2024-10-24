import { Router } from 'express';
import { createCampaign, getCampaigns, toggleCampaignStatus } from '../controllers/campaignController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/campaigns', verifyToken, createCampaign);
router.get('/campaigns', verifyToken, getCampaigns);
router.put('/campaigns/:id/toggle', verifyToken, toggleCampaignStatus);

export default router;
