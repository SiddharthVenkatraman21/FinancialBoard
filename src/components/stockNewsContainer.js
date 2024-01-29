import React, { useEffect, useState } from 'react';
import NewsComponent from './stockNewsCard';

function StockNewsContainer() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://finnhub.io/api/v1/news?category=forex&token=cmqk9qhr01ql2lmsd0qgcmqk9qhr01ql2lmsd0r0')
            .then(response => response.json())
            .then(data => {
                setNewsData(data.slice(0, 5)); // Limiting to first 10 news stories
            })
            .catch(error => console.error('Error:', error.message));
    };

    return (
    <div className="marketNews-App" style={{ marginRight:'5%',height: '100%', alignItems:'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h1 className="title" style={{ marginLeft: '100px', fontSize: '48px' }}>Foreign Exchange News</h1>
    <div style={{gap: '20px', width:'100%' }} className="newsCardsDivs">
        {newsData.map((newsItem, index) => (
            <NewsComponent key={index} newsItem={newsItem} />
        ))}
    </div>
</div>

    );
}

export default StockNewsContainer;
