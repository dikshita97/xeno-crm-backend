import mongoose, { Document, Schema } from 'mongoose';
export interface ICustomer extends Document {
  name: string;
  email: string;
  totalSpend: number;
  lastPurchase: Date | null;
}
const customerSchema = new Schema<ICustomer>({
  name: String,
  email: String,
  totalSpend: Number,
  lastPurchase: Date
});
export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
