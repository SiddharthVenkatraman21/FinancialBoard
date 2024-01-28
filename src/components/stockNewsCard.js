import React, { useState, useEffect } from 'react';

function NewsComponent() {
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://finnhub.io/api/v1/news?category=general&token=cmqk9qhr01ql2lmsd0qgcmqk9qhr01ql2lmsd0r0')
            .then(response => response.json())
            .then(data => {
                setNewsData(data);
            })
            .catch(error => console.error('Error:', error.message));
    };

    return (
        <div>
            <h2>News</h2>
            {newsData && (
                <ul>
                    {newsData.map((newsItem, index) => (
                        <li key={index}>
                            <h3>{newsItem.headline}</h3>
                            {newsItem.image && <img src={newsItem.image} alt="News" />}
                            <p>{newsItem.summary}</p>
                            <p>{newsItem.source}</p>
                            <a href={newsItem.url}>Read more</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NewsComponent;
