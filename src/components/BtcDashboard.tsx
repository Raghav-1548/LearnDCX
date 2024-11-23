import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Chart as ChartType } from 'chart.js';

// Define types
interface OrderBookEntry {
  price: number;
  size: number;
}

interface ChartDataPoint {
  x: number;
  y: number;
}

// Declare TradingView types
declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any;
    };
  }
}

const BtcDashboard: React.FC = () => {
  const orderBookChartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<ChartType | null>(null);

  // Inject styles
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #0F1116;
      color: #fff;
      font-family: 'Inter', sans-serif;
      position: relative;
    }

    .container {
      display: flex;
      flex: 1;
      flex-direction: row;
      height: 100%;
      padding: 20px;
      gap: 20px;
      justify-content: space-between;
      position: relative;
    }

    .left {
      width: 48%;
      background: linear-gradient(145.37deg, rgba(118, 118, 118, 0.06) 0%, rgba(44, 44, 44, 0.06) 100%);
      backdrop-filter: blur(10px);
      padding: 16px;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
    }

    .right {
      width: 48%;
      background: linear-gradient(145.37deg, rgba(118, 118, 118, 0.06) 0%, rgba(44, 44, 44, 0.06) 100%);
      backdrop-filter: blur(10px);
      padding: 16px;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
    }

    #tradingview_btcusdt {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
    }

    .chart-container {
      flex: 1;
      min-height: 0;
      position: relative;
      border-radius: 16px;
      overflow: hidden;
    }

    #orderBookChart {
      width: 100%;
      height: 100%;
    }

    h1 {
      text-align: center;
      color: #fff;
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 600;
      background: linear-gradient(to right, #3B82F6, #8B5CF6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metrics-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 20px;
      padding: 0 10px;
    }

    .metric-card {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      padding: 16px;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: all 0.3s ease;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.05);
    }

    .metric-title {
      color: #94A3B8;
      font-size: 14px;
      margin-bottom: 8px;
    }

    .metric-value {
      font-size: 20px;
      font-weight: 600;
      background: linear-gradient(to right, #3B82F6, #8B5CF6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .positive {
      background: linear-gradient(to right, #10B981, #34D399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .negative {
      background: linear-gradient(to right, #EF4444, #F87171);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .buttons-container {
      position: fixed;
      bottom: 30px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      padding: 0 40px;
      align-items: center;
    }

    .enter-position-button {
      background: linear-gradient(to right, #3B82F6, #8B5CF6);
      color: white;
      border: none;
      padding: 16px 40px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .enter-position-button:hover {
      background: linear-gradient(to right, #2563EB, #7C3AED);
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3);
    }

    .l2-button {
      position: fixed;
      bottom: 30px;
      right: 40px;
      background: linear-gradient(to right, #3B82F6, #8B5CF6);
      color: white;
      border: none;
      padding: 16px 40px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .l2-button:hover {
      background: linear-gradient(to right, #2563EB, #7C3AED);
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3);
    }
  `;

  const fetchOrderBook = async (): Promise<void> => {
    try {
      const response = await fetch("https://api.exchange.coinbase.com/products/BTC-USD/book?level=2");
      if (!response.ok) {
        throw new Error("Failed to fetch order book data");
      }

      const data = await response.json();

      const bids: OrderBookEntry[] = data.bids.slice(0, 20).map((order: string[]) => ({
        price: parseFloat(order[0]),
        size: parseFloat(order[1]),
      }));

      const asks: OrderBookEntry[] = data.asks.slice(0, 20).map((order: string[]) => ({
        price: parseFloat(order[0]),
        size: parseFloat(order[1]),
      }));

      let cumulativeBidSize = 0;
      let cumulativeAskSize = 0;

      const bidData: ChartDataPoint[] = bids.map(bid => {
        cumulativeBidSize += bid.size;
        return { x: bid.price, y: cumulativeBidSize };
      });

      const askData: ChartDataPoint[] = asks.map(ask => {
        cumulativeAskSize += ask.size;
        return { x: ask.price, y: cumulativeAskSize };
      });

      updateChart(bidData, askData);
    } catch (error) {
      console.error("Error fetching order book:", error);
    }
  };

  const updateChart = (bidData: ChartDataPoint[], askData: ChartDataPoint[]): void => {
    if (!orderBookChartRef.current) return;

    if (chart) chart.destroy();

    const newChart = new Chart(orderBookChartRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Bids',
            data: bidData,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 200, 0, 0.5)',
            fill: true,
          },
          {
            label: 'Asks',
            data: askData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Price (USD)',
              color: '#fff',
            },
            ticks: { color: '#fff' },
          },
          y: {
            title: {
              display: true,
              text: 'Cumulative Size (BTC)',
              color: '#fff',
            },
            ticks: { color: '#fff' },
          },
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            position: 'top',
            labels: { color: '#fff' },
          },
        },
      },
    });

    setChart(newChart);
  };

  const fetchFundingRate = async (): Promise<void> => {
    try {
      const response = await fetch("https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT");
      const data = await response.json();
      const fundingRate = (parseFloat(data.lastFundingRate) * 100).toFixed(4);
      
      const element = document.getElementById('fundingRate');
      if (element) {
        const value = parseFloat(fundingRate);
        element.textContent = `${fundingRate}%`;
        element.className = `metric-value ${value >= 0 ? 'positive' : 'negative'}`;
      }
    } catch (error) {
      console.error("Funding rate fetch error:", error);
      const element = document.getElementById('fundingRate');
      if (element) {
        element.textContent = 'Error';
      }
    }
  };

  const fetchLSRatio = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=BTCUSDT&period=5m"
      );
      const data = await response.json();
      const latest = data[0];
      
      const longPercent = (parseFloat(latest.longAccount) * 100).toFixed(2);
      const shortPercent = (parseFloat(latest.shortAccount) * 100).toFixed(2);
      
      const longsElement = document.getElementById('longsPercentage');
      const shortsElement = document.getElementById('shortsPercentage');
      
      if (longsElement) {
        longsElement.textContent = `${longPercent}%`;
        longsElement.className = 'metric-value positive';
      }
      if (shortsElement) {
        shortsElement.textContent = `${shortPercent}%`;
        shortsElement.className = 'metric-value negative';
      }
    } catch (error) {
      console.error("LSR fetch error:", error);
      const longsElement = document.getElementById('longsPercentage');
      const shortsElement = document.getElementById('shortsPercentage');
      
      if (longsElement) longsElement.textContent = 'Error';
      if (shortsElement) shortsElement.textContent = 'Error';
    }
  };

  const fetchOpenInterest = async (): Promise<void> => {
    try {
      const response = await fetch("https://fapi.binance.com/fapi/v1/openInterest?symbol=BTCUSDT");
      const data = await response.json();
      
      const priceResponse = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
      const priceData = await priceResponse.json();
      
      const btcPrice = parseFloat(priceData.price);
      const oiValueBTC = parseFloat(data.openInterest);
      const oiValueUSD = (oiValueBTC * btcPrice).toFixed(2);

      const element = document.getElementById('openInterest');
      if (element) {
        element.textContent = `$${Number(oiValueUSD).toLocaleString()}`;
      }
    } catch (error) {
      console.error("Open Interest fetch error:", error);
      const element = document.getElementById('openInterest');
      if (element) {
        element.textContent = 'Error';
      }
    }
  };
  
  const updateMetrics = async (): Promise<void> => {
    await Promise.all([
      fetchFundingRate(),
      fetchLSRatio(),
      fetchOpenInterest()
    ]);
  };

  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // TradingView widget initialization
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: "100%",
        symbol: "BINANCE:BTCUSDT",
        interval: "1",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: "tradingview_btcusdt"
      });
    };
    document.head.appendChild(script);

    // Initial data fetch
    fetchOrderBook();
    updateMetrics();

    // Set up intervals
    const orderBookInterval = setInterval(fetchOrderBook, 5000);
    const metricsInterval = setInterval(updateMetrics, 15000);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(styleSheet);
      clearInterval(orderBookInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <div className="container">
      <div className="left">
        <div className="tradingview-widget-container">
          <div id="tradingview_btcusdt"></div>
        </div>
      </div>

      <div className="right">
        <h1>Order Book Depth</h1>
        <div className="chart-container">
          <canvas ref={orderBookChartRef} id="orderBookChart"></canvas>
        </div>
        
        <div className="metrics-container">
          <div className="metric-card">
            <div className="metric-title">Funding Rate</div>
            <div className="metric-value" id="fundingRate">Loading...</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Longs %</div>
            <div className="metric-value" id="longsPercentage">Loading...</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Shorts %</div>
            <div className="metric-value" id="shortsPercentage">Loading...</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Open Interest</div>
            <div className="metric-value" id="openInterest">Loading...</div>
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <button 
          className="enter-position-button"
          onClick={() => window.location.href='/op'}
        >
          Enter Position
        </button>
      </div>

      <button 
        className="l2-button" 
        onClick={() => window.location.href='https://velo.xyz/futures'}
      >
        L2 Data
      </button>
    </div>
  );}

export default BtcDashboard;