import React, { useEffect, useState } from 'react';
import CompanyNewsCard from './companyNewsCard';
import './css/companyNewsContainer.css'

function CompanyNewsContainer() {
    const [companyNews, setCompanyNews] = useState([]);
    const [symbol, setSymbol] = useState('AAPL'); // Start state set to 'AAPL'
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        fetchCompanyNewsData();
    }, []); // Empty dependency array triggers the API call only once when the component mounts

    const fetchCompanyNewsData = () => {
        setLoading(true); // Set loading state to true before making the API call

        // Get today's date
        const today = new Date();
        // Get the date one year ago
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // Format dates in YYYY-MM-DD format
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
                setLoading(false); // Set loading state to false after the API call is completed
            });
    };

    const formatDate = (date) => {
        // Pad with leading zero if single digit
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
            <div className="newsCardsDivs">
                {companyNews.map((newsItem, index) => (
                    <CompanyNewsCard key={index} newsItem={newsItem} />
                ))}
            </div>
        </div>
    );
}

export default CompanyNewsContainer;
