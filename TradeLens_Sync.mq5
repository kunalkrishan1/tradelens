//+------------------------------------------------------------------+
//|                                              TradeLens_Sync.mq5  |
//|                                  Copyright 2026, TradeLens Inc.  |
//|                                             https://tradelens.io |
//+------------------------------------------------------------------+
#property copyright "TradeLens"
#property link      "https://tradelens.io"
#property version   "1.00"
#property strict

//--- Input parameters
input string   InpWebhookURL = "http://localhost:3000/api/mt5"; // TradeLens API Endpoint
input string   InpApiKey     = "YOUR_API_KEY_HERE";             // TradeLens API Key

//--- Global variables
datetime lastCheckTime = 0;

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
  {
   Print("TradeLens Sync EA Initialized. Listening for closed trades...");
   lastCheckTime = TimeCurrent();
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   Print("TradeLens Sync EA Deinitialized.");
  }

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
  {
   // Only check history periodically to save CPU (e.g., every 5 seconds)
   static datetime lastTick = 0;
   if(TimeCurrent() - lastTick < 5) return;
   lastTick = TimeCurrent();

   // Get history deals from the last check time to now
   HistorySelect(lastCheckTime, TimeCurrent());
   int totalDeals = HistoryDealsTotal();

   for(int i = 0; i < totalDeals; i++)
     {
      ulong ticket = HistoryDealGetTicket(i);
      if(ticket > 0)
        {
         long dealEntry = HistoryDealGetInteger(ticket, DEAL_ENTRY);
         // We only care about closed positions (DEAL_ENTRY_OUT)
         if(dealEntry == DEAL_ENTRY_OUT)
           {
            SendTradeToTradeLens(ticket);
           }
        }
     }
     
   // Update last check time
   lastCheckTime = TimeCurrent();
  }

//+------------------------------------------------------------------+
//| WebRequest Function to send data to Next.js API                  |
//+------------------------------------------------------------------+
void SendTradeToTradeLens(ulong deal_ticket)
  {
   string symbol = HistoryDealGetString(deal_ticket, DEAL_SYMBOL);
   long type = HistoryDealGetInteger(deal_ticket, DEAL_TYPE); // 0 = Buy, 1 = Sell
   double volume = HistoryDealGetDouble(deal_ticket, DEAL_VOLUME);
   double price = HistoryDealGetDouble(deal_ticket, DEAL_PRICE);
   double profit = HistoryDealGetDouble(deal_ticket, DEAL_PROFIT);
   long time = HistoryDealGetInteger(deal_ticket, DEAL_TIME);
   
   string side = (type == 1) ? "LONG" : "SHORT"; // If dealing out of a Buy, the closing deal is a Sell. Therefore, the original position was LONG.

   // Construct JSON payload
   string json = "{";
   json += "\"ticket\":\"" + IntegerToString(deal_ticket) + "\",";
   json += "\"symbol\":\"" + symbol + "\",";
   json += "\"side\":\"" + side + "\",";
   json += "\"size\":" + DoubleToString(volume, 2) + ",";
   json += "\"exit_price\":" + DoubleToString(price, 5) + ",";
   json += "\"pnl\":" + DoubleToString(profit, 2) + ",";
   json += "\"close_time\":\"" + TimeToString((datetime)time) + "\"";
   json += "}";

   char post[], result[];
   string headers = "Content-Type: application/json\r\nAuthorization: Bearer " + InpApiKey;
   
   StringToCharArray(json, post, 0, WHOLE_ARRAY, CP_UTF8);
   
   string result_headers;
   int res = WebRequest("POST", InpWebhookURL, headers, 5000, post, result, result_headers);
   
   if(res == 200 || res == 201)
     {
      Print("TradeLens Sync: Successfully synced trade " + IntegerToString(deal_ticket));
     }
   else
     {
      Print("TradeLens Sync Error: Failed to sync trade. HTTP Code: ", res);
     }
  }
