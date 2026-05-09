import mongoose from 'mongoose';

export interface ITrade extends mongoose.Document {
  tradeId: string;
  symbol: string;
  type: string;
  date: string;
  pnl: number;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema = new mongoose.Schema<ITrade>(
  {
    tradeId: { type: String, required: true },
    symbol: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    pnl: { type: Number, required: true },
    userId: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Trade || mongoose.model<ITrade>('Trade', TradeSchema);
