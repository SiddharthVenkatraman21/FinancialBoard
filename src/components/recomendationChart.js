import React, { useState } from 'react';
import './css/recomendationChart.css'

function RecommendationWidget() {
    const [symbol, setSymbol] = useState('MSFT');
    const [widgetSrc, setWidgetSrc] = useState(`https://widget.finnhub.io/widgets/recommendation?symbol=${symbol}`);

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value);
    };

    const handleReloadWidget = () => {
        setWidgetSrc(`https://widget.finnhub.io/widgets/recommendation?symbol=${symbol}`);
    };

    return (
        <div>
            <div className="info">
            <h1 className="titleMarket"> Market Analysis</h1>
        <div className="searchStuff">
            <input
                type="text"
                value={symbol}
                onChange={handleSymbolChange}
                placeholder="Enter symbol"
                className="searchBar"
            />
            <button className="clickButton" onClick={handleReloadWidget}>Recommendations</button>
        </div>
        </div>
        <div className="container" style={{ width: '900px', height: '815px', minHeight: '200px', maxHeight: '80vh', overflow: 'auto',marginTop:'25px' }}>
            
            <iframe
                title="Finnhub Recommendation Widget"
                src={widgetSrc}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
            />
        </div>
        </div>
    );
}

export default RecommendationWidget;
