import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trade from '@/models/Trade';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    // Simple mock authentication for local testing
    if (!authHeader || !authHeader.includes('Bearer')) {
      return NextResponse.json({ error: 'Unauthorized. Invalid API Key.' }, { status: 401 });
    }

    const data = await req.json();

    if (!data.ticket || !data.symbol) {
      return NextResponse.json({ error: 'Invalid payload from MT5' }, { status: 400 });
    }

    await connectToDatabase();

    // Map MT5 Data to TradeLens Schema
    const newTrade = new Trade({
      symbol: data.symbol,
      type: data.side,
      openTime: new Date(data.close_time), // MT5 payload gives close_time for the DEAL_OUT
      closeTime: new Date(data.close_time),
      volume: data.size,
      openPrice: data.exit_price, // Fallback, would need DEAL_IN price for true openPrice
      closePrice: data.exit_price,
      profit: data.pnl,
      commission: 0,
      swap: 0,
    });

    await newTrade.save();

    console.log(`Successfully synced MT5 Trade: ${data.ticket}`);

    return NextResponse.json({ success: true, trade: newTrade }, { status: 201 });

  } catch (error) {
    console.error('MT5 Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
