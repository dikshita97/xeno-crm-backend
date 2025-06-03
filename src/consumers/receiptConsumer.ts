import { redisClient } from '../config/redis';
import { CommunicationLog } from '../models/CommunicationLog';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../config/db';

const BATCH_SIZE = 50;
const STREAM_KEY = 'receipts';

(async () => {
  await connectDB(process.env.MONGODB_URI!);

  let lastId = '0-0';
  while (true) {
    const res = await redisClient.xRead(
      { key: STREAM_KEY, id: lastId },
      { COUNT: BATCH_SIZE, BLOCK: 5000 }
    );
    if (!res) continue;
    const records = res[0].messages;
    if (records.length === 0) continue;

    const bulk = CommunicationLog.collection.initializeUnorderedBulkOp();
    for (const msg of records) {
      const { vendorMessageId, recipient, status } = msg.message as any;
      bulk.find({ vendorMessageId }).updateOne({ $set: { status } });
      lastId = msg.id;
    }
    if (bulk.length > 0) await bulk.execute();
  }
})();
