import React, { useEffect, useState } from 'react';
import NewsComponent from './stockNewsCard'
function StockNewsContainer()
{
    const [newsData, setNewsData] = useState([]);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://finnhub.io/api/v1/news?category=forex&token=cmqk9qhr01ql2lmsd0qgcmqk9qhr01ql2lmsd0r0')
            .then(response => response.json())
            .then(data => {
                setNewsData(data.slice(0, 10)); // Limiting to first 10 news stories
            })
            .catch(error => console.error('Error:', error.message));
    };

    return (
        <div className="App">
            <h1 className="title">Foreign Exchange News</h1>
            <div style={{ marginLeft: '10px' }} className="newsCardsDivs">
                {newsData.map((newsItem, index) => (
                    <NewsComponent key={index} newsItem={newsItem} />
                ))}
            </div>
        </div>
    );
}

export default StockNewsContainer;