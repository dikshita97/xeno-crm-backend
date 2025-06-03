import { Router } from 'express';
import { redisClient } from '../config/redis';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Simulate sending SMS/email – 90% success
router.post('/send', async (req, res) => {
  const { recipient, text, callbackUrl } = req.body;
  const vendorMessageId = uuidv4();
  // simulate network latency
  setTimeout(async () => {
    const isSuccess = Math.random() < 0.9;
    await fetch(callbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendorMessageId, recipient, status: isSuccess ? 'SENT' : 'FAILED' })
    });
  }, 200);
  res.json({ vendorMessageId });
});

// Delivery Receipt API (hits individually)
router.post('/receipt', async (req, res) => {
  // push to redis stream for batch consumer
  await redisClient.xAdd('receipts', '*', req.body as any);
  res.json({ ok: true });
});
export default router;
