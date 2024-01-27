import React, { useState, useEffect } from 'react';
import './css/stockQuote.css';
import { CandlestickSeries, ChartCanvas, Chart } from 'react-stockcharts';
import { discontinuousTimeScaleProvider } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';

function StockQuote() {
  const defaultSymbol = 'MSFT'; // Default symbol
  const [symbol, setSymbol] = useState(defaultSymbol);
  const [inputSymbol, setInputSymbol] = useState(defaultSymbol);
  const [quoteData, setQuoteData] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    // Fetch data for default symbol (MSFT) when component initially renders
    fetchData(defaultSymbol);
  }, []);

  const handleSymbolChange = (event) => {
    setInputSymbol(event.target.value);
  };

  const fetchData = (symbolToFetch) => {
    setFetching(true);
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbolToFetch}&token=cmqk9qhr01ql2lmsd0qgcmqk9qhr01ql2lmsd0r0`)
      .then(response => response.json())
      .then(data => {
        setQuoteData(data);
        setFetching(false);
      })
      .catch(error => {
        console.error('Error fetching quote data:', error);
        setFetching(false);
      });
  };

  const handleFetchData = () => {
    setSymbol(inputSymbol);
    fetchData(inputSymbol);
  };

  return (
    <div className="stock-quote-container">
      <div>
        <label htmlFor="symbolInput" style={{ color: '#fff' }}>Symbol:</label>
        <input
          type="text"
          id="symbolInput"
          className="symbol-input"
          value={inputSymbol}
          onChange={handleSymbolChange}
          style={{ color: '#000', backgroundColor: '#fff' }}
        />
        <button
          className="fetch-button"
          onClick={handleFetchData}
          disabled={fetching}
          style={{ backgroundColor: '#007bff', color: '#fff' }}
        >
          {fetching ? 'Fetching...' : 'Fetch Quote'}
        </button>
      </div>
      {quoteData && (
        <div className="quote-data">
          <p style={{ color: '#fff' }}>Symbol: {symbol}</p>
          <p style={{ color: '#fff' }}>Current Price: {quoteData.c}</p>
          <p style={{ color: '#fff' }}>High Today: {quoteData.h}</p>
          <p style={{ color: '#fff' }}>Low Today: {quoteData.l}</p>

          {/* Candlestick chart */}
          <div style={{ height: 400 }}>
            <ChartCanvas
              width={800}
              height={400}
              ratio={1}
              margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
              type="svg"
              seriesName="MSFT"
              data={[{
                date: new Date(), // Use actual date for the current time
                open: quoteData.o, // Open price
                high: quoteData.h, // High price
                low: quoteData.l, // Low price
                close: quoteData.c, // Close price
              }]}
              xAccessor={d => d.date}
              xScaleProvider={discontinuousTimeScaleProvider}
              xExtents={[new Date(), new Date()]} // Start and end date
            >
              <Chart id={0} yExtents={d => [d.high, d.low]}>
                <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                <YAxis axisAt="left" orient="left" ticks={5} />
                <CandlestickSeries />
              </Chart>
            </ChartCanvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockQuote;
