import React, { useEffect, useState } from 'react';
import CompanyNewsCard from './companyNewsCard';
import './css/companyNewsContainer.css';

function CompanyNewsContainer() {
    const [companyNews, setCompanyNews] = useState([]);
    const [symbol, setSymbol] = useState('AAPL');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCompanyNewsData();
    }, []);


    const fetchCompanyNewsData = () => {
        setLoading(true);

        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const toDate = formatDate(today);
        const fromDate = formatDate(oneYearAgo);

        fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=cmqk9qhr01ql2lmsd0qgcmqk9qhr01ql2lmsd0r0`)
            .then(response => response.json())
            .then(data => {
                const filteredAndSortedData = data
                    .filter(item => item.image !== '')
                    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
                setCompanyNews(filteredAndSortedData.slice(0, 10));
            })
            .catch(error => console.error('Error:', error.message))
            .finally(() => {
                setLoading(false);
            });
    };

    const formatDate = (date) => {
        const pad = (num) => (num < 10 ? '0' : '') + num;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value);
    };

    const handleFetchData = () => {
        fetchCompanyNewsData();
    };


return (
    <div className="App">
        <h1 className="title">Company News</h1>
        <div className="searchContainer">
            <div className="searchContainer">
                <input
                    type="text"
                    value={symbol}
                    onChange={handleSymbolChange}
                    className="searchInput"
                />
                <button className="searchButton" onClick={handleFetchData} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </div>
        <div className="scrollableContainer">
            <div className="newsCardsDivs">
                {companyNews.map((newsItem, index) => (
                    <CompanyNewsCard key={index} newsItem={newsItem} />
                ))}
            </div>
        </div>
    </div>
);
}

export default CompanyNewsContainer;
