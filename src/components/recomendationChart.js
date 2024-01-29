import React, { useState, useEffect } from 'react';
import './css/recomendationChart.css';

function RecommendationWidget() {
    const [symbol, setSymbol] = useState('MSFT');
    const [widgetSrc, setWidgetSrc] = useState(`https://widget.finnhub.io/widgets/recommendation?symbol=${symbol}`);
    const [iframeHeight, setIframeHeight] = useState(600); // Default height

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value);
    };

    const handleReloadWidget = () => {
        setWidgetSrc(`https://widget.finnhub.io/widgets/recommendation?symbol=${symbol}`);
    };

    useEffect(() => {
        const viewportHeight = window.innerHeight;
        const dynamicHeight = Math.max(viewportHeight / 1.45, 100); // Choose the larger of 600px and viewportHeight/3
        setIframeHeight(dynamicHeight);
    }, []); // Run only once on component mount

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
                    <button className="clickButton" onClick={handleReloadWidget}>Analyze</button>
                </div>
            </div>
            <div className="container" style={{ width: '100%', height: '100%', overflow: 'auto', marginTop: '25px' }}>
                <iframe
                    title="Finnhub Recommendation Widget"
                    src={widgetSrc}
                    width="100%"
                    height="830px"

                    frameBorder="0"
                    scrolling="no"
                />
            </div>
        </div>
    );
}

export default RecommendationWidget;
