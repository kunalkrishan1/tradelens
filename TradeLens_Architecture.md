# TradeLens: System Architecture
**Technical Architecture & Data Flow Documentation**
**Version 1.0.0**

---

## High-Level Architecture Overview
TradeLens is built on a modern, decoupled full-stack architecture utilizing Next.js as the core meta-framework. It is designed to handle high-frequency data from trading brokerages while maintaining a responsive, beautiful front-end experience.

The system is broken down into three core tiers:
1. **The Client Interface (Frontend)**
2. **The API & Ingestion Layer (Backend)**
3. **The Data Sources (MT5 & Cloud)**

---

## System Diagram (Data Flow)

1. **Trade Execution:** The user takes a trade on their mobile phone via the MT5 App.
2. **Broker Server:** The trade is registered on the broker's server (e.g., Vantage, Exness).
3. **MetaApi Cloud Node:** The MetaApi SDK maintains a persistent RPC connection to the broker.
4. **TradeLens API Route:** `POST /api/metaapi` requests the trade history from MetaApi.
5. **Next.js Frontend:** The React dashboard ingests the JSON payload, normalizes the data, and renders the Glassmorphic charts and replay engines.

---

## 1. The Client Interface (Frontend)
- **Framework:** Next.js 16 (App Router) + React 19
- **State Management:** React Hooks (`useState`, `useEffect`) with `localStorage` persistence for seamless reloads.
- **Styling Engine:** Vanilla CSS integrated with CSS Variables (Custom Properties) to power the "Glassmorphism" aesthetic and dynamic light/dark/currency toggles.
- **Visualization Libraries:** 
  - `recharts` for scalable SVG-based analytical charts (P&L, scatter plots).
  - `lightweight-charts` for high-performance HTML5 Canvas rendering of candlestick data in the Replay Engine.

---

## 2. The API & Ingestion Layer (Serverless Backend)
TradeLens utilizes Next.js Serverless API routes to handle secure operations without exposing credentials to the client.

- **`/api/metaapi` (Cloud Sync Route):** 
  - Imports the `metaapi.cloud-sdk`.
  - Uses the `META_API_TOKEN` from `.env.local` to securely authenticate against the MetaApi infrastructure.
  - Provisions the user's account and uses the `getDealsByTimeRange()` RPC method to pull exact MT5 history.
  - Automatically transforms raw MT5 Deals into TradeLens format (calculating exact P&L, Mapping DEAL_TYPE_BUY/SELL to LONG/SHORT, etc.).

- **`/api/mt5` (Local Webhook Route):**
  - An alternative ingestion endpoint designed to receive immediate HTTP POST requests from the local `TradeLens_Sync.mq5` Expert Advisor.

---

## 3. Data Persistence & Extensibility
While currently utilizing robust `localStorage` for rapid prototyping and immediate user gratification, the architecture is fully prepared for cloud database integration.

- **Mongoose/MongoDB:** The system contains a fully scaffolded `lib/mongodb.ts` file, establishing the connection pool logic for a NoSQL database.
- **Data Shape:** The `Trade` interface enforces strict typing on the frontend, ensuring any data coming from CSV, Webhooks, or MetaApi conforms to the exact schema required by the analytics engines.

---

## Security & Privacy
- **Read-Only Protocol:** TradeLens strictly enforces the use of the MetaTrader "Investor Password". The system can *read* trades but physically cannot execute, modify, or close trades on the user's behalf.
- **Stateless Cloud:** TradeLens does not store the user's MT5 password in a database; it is passed securely via memory to the MetaApi SDK during the sync request.
