import { Campaign } from '../models/Campaign';
import { CommunicationLog } from '../models/CommunicationLog';
import { Segment } from '../models/Segment';
import { Customer } from '../models/Customer';
import { redisClient } from '../config/redis';
import { generateMessageVariants } from '../utils/openai';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const startCampaign = async (segmentId: string, userId: string) => {
  const segment = await Segment.findById(segmentId);
  if (!segment) throw new Error('Segment not found');

  // Generate message template with AI
  const [messageTemplate] = await generateMessageVariants('bring back inactive users');

  const campaign = await Campaign.create({
    segment: segment._id,
    messageTemplate,
    createdBy: userId
  });

  // Find customers matching rule (simple filter example)
  const criteria: any = {};
  if (segment.rule.totalSpend) criteria.totalSpend = { $gte: segment.rule.totalSpend };
  if (segment.rule.lastPurchaseBefore)
    criteria.lastPurchase = { $lte: new Date(segment.rule.lastPurchaseBefore) };

  const customers = await Customer.find(criteria);

  // Insert communication logs
  const logs = customers.map((c) => ({
    campaign: campaign._id,
    customer: c._id,
    message: messageTemplate.replace('{{name}}', c.name),
    status: 'PENDING'
  }));
  await CommunicationLog.insertMany(logs);

  // Send messages via Dummy Vendor
  for (const customer of customers) {
    const payload = {
      recipient: customer.email,
      text: messageTemplate.replace('{{name}}', customer.name),
      callbackUrl: `${process.env.BASE_URL}/vendor/receipt`
    };
    await axios.post(`${process.env.BASE_URL}/vendor/send`, payload, {
      // internal call
      timeout: 1000
    });
  }

  return campaign;
};
