import mongoose, { Document, Schema, Types } from 'mongoose';
export interface ICampaign extends Document {
  segment: Types.ObjectId;
  messageTemplate: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}
const campaignSchema = new Schema<ICampaign>({
  segment: { type: Schema.Types.ObjectId, ref: 'Segment', required: true },
  messageTemplate: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
export const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);
