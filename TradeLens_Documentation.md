# TradeLens: Professional Trading Journal
**Comprehensive Feature & Architecture Documentation**
**Version 1.0.0**

---

## 1. Automated Trade Synchronization
TradeLens completely eliminates the need for manual data entry through multiple automated integration pipelines.

### A. MetaApi Cloud Integration (Fully Automated)
- **Direct Broker Connection:** Securely connects to your broker's MT5 server (e.g., Vantage, Exness) via the MetaApi cloud infrastructure.
- **Mobile-First Syncing:** Automatically pulls trades taken on the MT5 Mobile app directly into TradeLens without needing a PC or desktop terminal.
- **Smart Duplicate Filtering:** The Next.js backend intelligently maps historical RPC deals and filters out duplicate ticket IDs to ensure an accurate portfolio.
- **Demo Mode Engine:** Features a fallback simulation mode that generates realistic mock trades (XAUUSD, EURUSD, US30) if a live API token is not detected.

### B. MQL5 Expert Advisor (Local Sync)
- **TradeLens_Sync.mq5:** A custom-built Expert Advisor designed for MT5 Desktop users.
- **Real-Time Webhooks:** Instantly fires HTTP POST requests to the local Next.js `/api/mt5` route the millisecond a trade is closed.

### C. CSV Parsing Engine
- **Universal Broker Support:** Robust CSV ingestion capable of parsing standard MetaTrader history reports.
- **Currency Normalization:** Handles various broker export formats, including Cent and Dollar variations.

---

## 2. Advanced Visual Analytics
A professional-grade analytics suite built with Recharts, customized with a dark fintech UI.

- **Cumulative P&L AreaChart:** A highly polished, gradient-filled timeline charting the exact date-wise growth or drawdown of your equity curve.
- **Trade Time Performance:** A precise scatter plot that correlates trade profitability with time of day, exposing optimal trading windows.
- **Win/Loss Distribution:** A neon-glowing Donut chart visualizing exact win rates and execution consistency.
- **Global Currency State:** Instantly toggle the entire dashboard and all charts between different base currencies (e.g., `$` and `¢`).

---

## 3. The Trade Replay Engine
A flagship feature designed to help traders relive their execution and expose behavioral mistakes.

- **TradingView Integration:** Powered by `lightweight-charts` for maximum rendering performance.
- **Candle-by-Candle Playback:** Features a timeline slider, variable speed controls (1x, 4x, Max), and a play/pause interface.
- **Visual Annotations:** Automatically plots precise Entry and Exit markers directly onto the historical candlestick data.
- **AI Execution Review:** A real-time insight panel that detects emotional mistakes (e.g., "Early Exit Detected" or "Perfect Momentum Capture") as the replay progresses.

---

## 4. Live Portfolio & Journal Management
- **Live Account Balance Tracking:** Allows the user to input a "Starting Deposit" which dynamically aggregates with real-time Net P&L to display true account equity.
- **Inline Editing System:** The journal table features frictionless, interactive inline editing. Clicking any row's "Note" section instantly converts it into an input field, saving automatically to storage on blur.
- **Data Persistence:** Relies on robust local browser storage (`localStorage`) and a fully scaffolded Mongoose/MongoDB backend architecture for future cloud scaling.

---

## 5. Reporting & Export Utilities
- **1-Click High-Res Screenshots:** Utilizes `html2canvas` to capture and download a high-quality snapshot of the entire dashboard for easy sharing on social media or mentorship reviews.
- **CSV Data Export:** Instantly download your processed TradeLens journal back into an Excel-friendly CSV format.

---

**Built with:** *Next.js 16, React 19, TypeScript, Recharts, Lightweight-Charts, MetaApi SDK, and custom MQL5.*
