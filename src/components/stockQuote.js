import React, { useState, useEffect } from 'react';
import './css/stockQuote.css';

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

  const getPerformanceColor = (value) => {
    if (value > 0) {
      return 'green';
    } else if (value < 0) {
      return 'red';
    } else {
      return 'white';
    }
  };

  return (
    <div className="stock-quote-container">
      <div>
        <label htmlFor="symbolInput">Symbol:</label>
        <input
          type="text"
          id="symbolInput"
          className="symbol-input"
          value={inputSymbol}
          onChange={handleSymbolChange}
        />
        <button
          className="fetch-button"
          onClick={handleFetchData}
          disabled={fetching}
        >
          {fetching ? 'Fetching...' : 'Fetch Quote'}
        </button>
      </div>
      {quoteData && (
        <div className="quote-data">
          <p style={{ color: '#fff' }}>Symbol: {symbol}</p>
          <p>Current Price: <span style={{ color: '#fdca40' }}>{quoteData.c}</span></p>
          <p>High Today: <span style={{ color: '#6096ba' }}>{quoteData.h}</span></p>
          <p>Low Today: <span style={{ color: '#b1ddf1' }}>{quoteData.l}</span></p>
          <p>Percent Change: <span style={{ color: getPerformanceColor(quoteData.dp) }}>{quoteData.dp}</span></p>
          {/* Add more data as needed */}
        </div>
      )}
    </div>
  );
}

export default StockQuote;
