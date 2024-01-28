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
        <div className="container">
            <input
                type="text"
                value={symbol}
                onChange={handleSymbolChange}
                placeholder="Enter symbol"
                className="searchBar"
            />
            <button className="clickButton" onClick={handleReloadWidget}>Recommendations</button>
            <iframe
                title="Finnhub Recommendation Widget"
                src={widgetSrc}
                width="85%" 
                height="600px"
                frameBorder="0"
                scrolling="no"
            />
        </div>
    );
}

export default RecommendationWidget;
