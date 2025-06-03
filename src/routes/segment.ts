import { Router } from 'express';
import { nlToRules } from '../utils/openai';
import { Segment } from '../models/Segment';
import { ensureAuth } from '../utils/passportGoogle';
import { startCampaign } from '../services/CampaignService';

const router = Router();

router.post('/nl2segment', ensureAuth, async (req, res) => {
  const { prompt } = req.body;
  const rule = await nlToRules(prompt);
  res.json({ rule });
});

router.post('/', ensureAuth, async (req: any, res) => {
  const { name, rule } = req.body;
  const segment = await Segment.create({ name, rule, createdBy: req.user._id });
  // trigger campaign automatically
  await startCampaign(segment._id.toString(), req.user._id.toString());
  res.json({ segmentId: segment._id });
});

export default router;
