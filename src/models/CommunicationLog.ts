import mongoose, { Document, Schema, Types } from 'mongoose';
export interface ICommLog extends Document {
  campaign: Types.ObjectId;
  customer: Types.ObjectId;
  message: string;
  status: 'PENDING' | 'SENT' | 'FAILED';
  vendorMessageId?: string;
  updatedAt: Date;
}
const commSchema = new Schema<ICommLog>({
  campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  message: String,
  status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' },
  vendorMessageId: String,
  updatedAt: { type: Date, default: Date.now }
});
export const CommunicationLog = mongoose.model<ICommLog>('CommunicationLog', commSchema);
