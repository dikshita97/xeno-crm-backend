import { Router } from 'express';
import { ensureAuth } from '../utils/passportGoogle';
import { CommunicationLog } from '../models/CommunicationLog';
import { Campaign } from '../models/Campaign';

const router = Router();
router.get('/', ensureAuth, async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
});
router.get('/:id/logs', ensureAuth, async (req, res) => {
  const logs = await CommunicationLog.find({ campaign: req.params.id });
  res.json(logs);
});
export default router;
