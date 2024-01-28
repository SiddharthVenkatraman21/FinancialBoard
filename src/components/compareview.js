import React, { useState } from 'react';
import StockQuote from './stockQuote';

function CompareView() {
  const [numStockQuotes, setNumStockQuotes] = useState(1);
  const [stockQuotes, setStockQuotes] = useState(Array.from({ length: numStockQuotes }, (_, index) => index + 1));

  const handleAddStockQuote = () => {
    if (numStockQuotes < 4) {
      setNumStockQuotes(prevNumStockQuotes => prevNumStockQuotes + 1);
      setStockQuotes(prevStockQuotes => [...prevStockQuotes, numStockQuotes + 1]);
    }
  };

  const handleDeleteStockQuote = (index) => {
    setNumStockQuotes(prevNumStockQuotes => prevNumStockQuotes - 1);
    setStockQuotes(prevStockQuotes => prevStockQuotes.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        backgroundColor: '#202124',
        padding: '20px',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: '20px',
          right: '60px',
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          width: '10%',
        }}
        onClick={handleAddStockQuote}
      >
        Compare +
      </button>
      <div style={{ display: 'flex', marginTop: '8%' }}>
        {stockQuotes.map((index) => (
          <StockQuote key={index} onDelete={() => handleDeleteStockQuote(index - 1)} />
        ))}
      </div>
    </div>
  );
}

export default CompareView;
