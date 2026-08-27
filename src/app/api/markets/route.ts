import { NextResponse } from 'next/server';

export interface MarketItem {
  symbol: string;
  name: string;
  category: 'Stocks' | 'Indices' | 'ETFs' | 'Crypto' | 'Commodities' | 'Forex';
  price: number;
  changePercent: number;
  changeValue: number;
  high: number;
  low: number;
  volume: string;
  sparkline: number[];
  currency: string;
}

export interface FinancialHub {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  marketIndex: string;
  changePercent: number;
  currentValue: string;
  status: 'Open' | 'Closed' | 'Pre-Market';
  localTime: string;
}

const MARKET_DATA: MarketItem[] = [
  // Indices
  {
    symbol: 'NIFTY 50',
    name: 'National Stock Exchange of India',
    category: 'Indices',
    price: 24835.10,
    changePercent: 1.24,
    changeValue: 304.50,
    high: 24890.00,
    low: 24590.20,
    volume: '3.4B',
    sparkline: [24550, 24600, 24680, 24620, 24750, 24780, 24835],
    currency: '₹',
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX India',
    category: 'Indices',
    price: 81520.45,
    changePercent: 0.87,
    changeValue: 702.10,
    high: 81680.00,
    low: 80920.00,
    volume: '2.1B',
    sparkline: [80900, 81100, 81050, 81300, 81450, 81520],
    currency: '₹',
  },
  {
    symbol: 'S&P 500',
    name: 'Standard & Poor\'s 500',
    category: 'Indices',
    price: 5648.40,
    changePercent: 0.64,
    changeValue: 35.80,
    high: 5660.10,
    low: 5612.30,
    volume: '4.8B',
    sparkline: [5610, 5625, 5618, 5635, 5642, 5648],
    currency: '$',
  },
  {
    symbol: 'NASDAQ',
    name: 'Nasdaq Composite',
    category: 'Indices',
    price: 17820.60,
    changePercent: 1.12,
    changeValue: 197.30,
    high: 17880.00,
    low: 17650.00,
    volume: '5.2B',
    sparkline: [17620, 17680, 17720, 17690, 17790, 17820],
    currency: '$',
  },

  // Stocks
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'Stocks',
    price: 128.45,
    changePercent: 3.42,
    changeValue: 4.25,
    high: 130.10,
    low: 124.80,
    volume: '62.4M',
    sparkline: [124, 125.5, 126, 125, 127.8, 128.45],
    currency: '$',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'Stocks',
    price: 224.23,
    changePercent: 0.78,
    changeValue: 1.74,
    high: 225.80,
    low: 222.10,
    volume: '48.9M',
    sparkline: [222, 223, 222.5, 223.8, 224, 224.23],
    currency: '$',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    category: 'Stocks',
    price: 215.60,
    changePercent: -1.85,
    changeValue: -4.06,
    high: 221.00,
    low: 214.20,
    volume: '55.1M',
    sparkline: [220, 219, 217, 218, 216, 215.6],
    currency: '$',
  },

  // Crypto
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'Crypto',
    price: 64320.00,
    changePercent: 2.31,
    changeValue: 1450.00,
    high: 64800.00,
    low: 62700.00,
    volume: '$31.2B',
    sparkline: [62800, 63100, 63500, 63200, 64100, 64320],
    currency: '$',
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'Crypto',
    price: 3485.50,
    changePercent: 3.15,
    changeValue: 106.40,
    high: 3520.00,
    low: 3360.00,
    volume: '$18.4B',
    sparkline: [3370, 3410, 3390, 3440, 3470, 3485.5],
    currency: '$',
  },
  {
    symbol: 'SOL/USD',
    name: 'Solana',
    category: 'Crypto',
    price: 154.20,
    changePercent: 5.64,
    changeValue: 8.24,
    high: 156.00,
    low: 144.50,
    volume: '$4.8B',
    sparkline: [145, 147, 149, 148, 152, 154.2],
    currency: '$',
  },

  // Commodities
  {
    symbol: 'GOLD (XAU)',
    name: 'Gold Spot USD',
    category: 'Commodities',
    price: 2512.40,
    changePercent: 0.42,
    changeValue: 10.50,
    high: 2518.20,
    low: 2498.00,
    volume: '$22.1B',
    sparkline: [2500, 2504, 2502, 2508, 2510, 2512.4],
    currency: '$',
  },
  {
    symbol: 'CRUDE OIL',
    name: 'Brent Crude',
    category: 'Commodities',
    price: 78.45,
    changePercent: -1.14,
    changeValue: -0.90,
    high: 79.80,
    low: 77.90,
    volume: '$14.6B',
    sparkline: [79.5, 79.2, 78.8, 79.0, 78.6, 78.45],
    currency: '$',
  },

  // Forex
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'Forex',
    price: 1.1085,
    changePercent: 0.18,
    changeValue: 0.002,
    high: 1.1102,
    low: 1.1060,
    volume: '$95B',
    sparkline: [1.1065, 1.1072, 1.1070, 1.1080, 1.1082, 1.1085],
    currency: '€',
  },
  {
    symbol: 'USD/INR',
    name: 'US Dollar / Indian Rupee',
    category: 'Forex',
    price: 83.92,
    changePercent: -0.05,
    changeValue: -0.04,
    high: 83.98,
    low: 83.88,
    volume: '$12B',
    sparkline: [83.96, 83.95, 83.93, 83.94, 83.91, 83.92],
    currency: '₹',
  },

  // ETFs
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    category: 'ETFs',
    price: 482.10,
    changePercent: 1.15,
    changeValue: 5.48,
    high: 483.50,
    low: 476.20,
    volume: '$18.2B',
    sparkline: [476, 478, 479, 480, 481.5, 482.1],
    currency: '$',
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    category: 'ETFs',
    price: 563.80,
    changePercent: 0.65,
    changeValue: 3.64,
    high: 565.00,
    low: 560.10,
    volume: '$24.5B',
    sparkline: [560, 561.5, 562, 563, 563.4, 563.8],
    currency: '$',
  }
];

const FINANCIAL_HUBS: FinancialHub[] = [
  {
    id: 'nyc',
    name: 'New York',
    country: 'United States',
    lat: 40.7128,
    lng: -74.0060,
    marketIndex: 'S&P 500',
    changePercent: 0.64,
    currentValue: '5,648.40',
    status: 'Open',
    localTime: '09:45 EDT',
  },
  {
    id: 'lon',
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    marketIndex: 'FTSE 100',
    changePercent: 0.72,
    currentValue: '8,345.10',
    status: 'Open',
    localTime: '14:45 BST',
  },
  {
    id: 'bom',
    name: 'Mumbai',
    country: 'India',
    lat: 19.0760,
    lng: 72.8777,
    marketIndex: 'NIFTY 50',
    changePercent: 1.24,
    currentValue: '24,835.10',
    status: 'Open',
    localTime: '19:15 IST',
  },
  {
    id: 'tyo',
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    marketIndex: 'NIKKEI 225',
    changePercent: 1.08,
    currentValue: '38,362.50',
    status: 'Closed',
    localTime: '22:45 JST',
  },
  {
    id: 'sin',
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    marketIndex: 'STI',
    changePercent: 0.45,
    currentValue: '3,412.80',
    status: 'Closed',
    localTime: '21:45 SGT',
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    country: 'Hong Kong SAR',
    lat: 22.3193,
    lng: 114.1694,
    marketIndex: 'HANG SENG',
    changePercent: -0.35,
    currentValue: '17,640.20',
    status: 'Closed',
    localTime: '21:45 HKT',
  },
  {
    id: 'fra',
    name: 'Frankfurt',
    country: 'Germany',
    lat: 50.1109,
    lng: 8.6821,
    marketIndex: 'DAX 40',
    changePercent: 0.58,
    currentValue: '18,630.40',
    status: 'Open',
    localTime: '15:45 CEST',
  },
  {
    id: 'dxb',
    name: 'Dubai',
    country: 'UAE',
    lat: 25.2048,
    lng: 55.2708,
    marketIndex: 'DFMGI',
    changePercent: 0.39,
    currentValue: '4,380.15',
    status: 'Closed',
    localTime: '17:45 GST',
  },
  {
    id: 'syd',
    name: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
    marketIndex: 'ASX 200',
    changePercent: 0.52,
    currentValue: '8,080.60',
    status: 'Closed',
    localTime: '23:45 AEST',
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  let filtered = MARKET_DATA;
  if (category && category !== 'All') {
    filtered = MARKET_DATA.filter((m) => m.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    data: {
      markets: filtered,
      hubs: FINANCIAL_HUBS,
      ticker: MARKET_DATA.slice(0, 10),
      timestamp: new Date().toISOString(),
    },
  });
}

