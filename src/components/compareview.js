import React, { useState } from 'react';
import StockQuote from './stockQuote';

function CompareView() {
  const [numStockQuotes, setNumStockQuotes] = useState(1);
  const [stockQuotes, setStockQuotes] = useState(Array.from({ length: numStockQuotes }, (_, index) => ({ id: index + 1 })));

  const handleAddStockQuote = () => {
    if (numStockQuotes < 4 && stockQuotes.length < 4) {
      setNumStockQuotes(prevNumStockQuotes => prevNumStockQuotes + 1);
      setStockQuotes(prevStockQuotes => [...prevStockQuotes, { id: prevStockQuotes.length + 1 }]);
    }
  };

  const handleDeleteStockQuote = (id) => {
    console.log("Deleting id:", id);
    setNumStockQuotes(prevNumStockQuotes => prevNumStockQuotes - 1);
    setStockQuotes(prevStockQuotes => prevStockQuotes.filter(stock => stock.id !== id));
  };

  return (
    <div
      style={{
        backgroundColor: '#121212',
        padding: '2%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: '2%',
          right: '5%',
          padding: '1%',
          fontSize: '1.5vw', // Converted to percentage
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '1vw', // Converted to percentage
          cursor: 'pointer',
          width: '10%',
        }}
        onClick={handleAddStockQuote}
      >
        Compare +
      </button>
      <div style={{ display: 'flex', marginTop: '8%' }}>
        {stockQuotes.map((stock, index) => (
          <StockQuote key={`stock-${stock.id}`} onDelete={() => handleDeleteStockQuote(stock.id)} />
        ))}
      </div>
    </div>
  );
}

export default CompareView;
