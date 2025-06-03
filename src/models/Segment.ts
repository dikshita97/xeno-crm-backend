import mongoose, { Document, Schema, Types } from 'mongoose';
export interface ISegment extends Document {
  name: string;
  rule: any; // JSON rule definition
  createdBy: Types.ObjectId;
  createdAt: Date;
}
const segmentSchema = new Schema<ISegment>({
  name: { type: String, required: true },
  rule: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
export const Segment = mongoose.model<ISegment>('Segment', segmentSchema);
