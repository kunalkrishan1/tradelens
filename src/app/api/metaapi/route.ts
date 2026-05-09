import { NextResponse } from 'next/server';
const MetaApi = require('metaapi.cloud-sdk').default || require('metaapi.cloud-sdk');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { server, login, password } = data;

    if (!server || !login || !password) {
      return NextResponse.json({ error: 'Missing required MT5 credentials' }, { status: 400 });
    }

    const token = process.env.META_API_TOKEN;
    if (!token || token === 'your_token_here') {
      console.log('No MetaApi Token found. Running in DEMO MODE.');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate connection delay
      
      const mockTrades = [
        { id: `MT5-D1-${Date.now()}`, symbol: 'XAUUSDm', side: 'LONG', open: '2026-05-08 10:30', close: '2026-05-08 11:15', size: 1.5, entry: 2340.50, exit: 2345.10, pnl: 690.00, return: 0, rr: '-', tags: ['MT5 Sync', 'Demo'], note: 'Breakout retest', hasChart: false },
        { id: `MT5-D2-${Date.now()}`, symbol: 'EURUSDm', side: 'SHORT', open: '2026-05-08 14:00', close: '2026-05-08 14:45', size: 2.0, entry: 1.0850, exit: 1.0820, pnl: 600.00, return: 0, rr: '-', tags: ['MT5 Sync', 'Demo'], note: 'Session liquidity sweep', hasChart: false },
        { id: `MT5-D3-${Date.now()}`, symbol: 'US30m', side: 'LONG', open: '2026-05-09 09:30', close: '2026-05-09 09:45', size: 5.0, entry: 39500, exit: 39450, pnl: -250.00, return: 0, rr: '-', tags: ['MT5 Sync', 'Demo'], note: 'Stopped out on open volatility', hasChart: false }
      ];

      return NextResponse.json({ 
        success: true, 
        message: 'Connected in Demo Mode! (Insert real token in .env.local for live data)',
        trades: mockTrades
      });
    }

    // 1. Initialize MetaApi instance
    const api = new MetaApi(token);

    // 2. Provision or retrieve account
    let account;
    try {
      const accounts = await api.metatraderAccountApi.getAccountsWithInfiniteScrollPagination();
      account = accounts.find((a: any) => a.login === login.toString());
      
      if (!account) {
        console.log('Account not found on MetaApi cloud. Provisioning a new one...');
        account = await api.metatraderAccountApi.createAccount({
          name: `TradeLens_${login}`,
          login: login.toString(),
          password: password.toString(),
          server: server.toString(),
          platform: 'mt5'
        });
      }
    } catch (err: any) {
      console.error('Error fetching/creating account:', err?.response || err);
      const details = err?.response?.data ? JSON.stringify(err.response.data) : '';
      return NextResponse.json({ error: `MetaApi Validation Error: ${err.message || 'Unknown error'}. ${details}` }, { status: 500 });
    }

    // 3. Deploy and connect
    if (account.state !== 'DEPLOYED') {
      console.log('Deploying account to cloud...');
      await account.deploy();
    }
    
    console.log('Waiting for connection...');
    await account.waitConnected();

    const connection = account.getRPCConnection();
    await connection.connect();
    console.log('Synchronizing with broker server...');
    await connection.waitSynchronized();

    // 4. Fetch history (Last 30 days)
    const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endTime = new Date();
    
    console.log(`Fetching historical deals from ${startTime.toISOString()} to ${endTime.toISOString()}`);
    const resDeals = await connection.getDealsByTimeRange(startTime, endTime);
    
    // In SDK, the deals are nested in a 'deals' array property from the return object
    const dealsArray = resDeals.deals || resDeals;
    
    // Map MetaApi Deals to TradeLens format
    const formattedTrades = dealsArray
      .filter((deal: any) => deal.entryType === 'DEAL_ENTRY_OUT' && deal.symbol)
      .map((deal: any) => {
        // Convert 'DEAL_TYPE_SELL' to LONG because if the closing deal is a sell, the position was a LONG.
        const side = deal.type === 'DEAL_TYPE_SELL' ? 'LONG' : 'SHORT'; 
        return {
          id: `MT5-${deal.id}`,
          symbol: deal.symbol,
          side: side,
          open: new Date(deal.time).toISOString().replace('T', ' ').substring(0, 16), // Simplified open time
          close: new Date(deal.time).toISOString().replace('T', ' ').substring(0, 16),
          size: deal.volume,
          entry: deal.price, 
          exit: deal.price,
          pnl: deal.profit,
          return: 0,
          rr: '-',
          tags: ['MT5 Sync'],
          note: deal.comment || '',
          hasChart: false
        };
      });

    console.log(`Successfully synced ${formattedTrades.length} trades.`);

    return NextResponse.json({ 
      success: true, 
      message: 'Cloud MT5 Account successfully provisioned and synced!',
      trades: formattedTrades
    });

  } catch (error: any) {
    console.error('MetaApi Webhook Error:', error);
    return NextResponse.json({ error: `Connection failed: ${error.message || 'Unknown error'}` }, { status: 500 });
  }
}
