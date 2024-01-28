import React, { useEffect} from 'react';
import './css/stockNewsCard.css';

function CompanyNewsCard({ newsItem }) {
    // Function to convert Unix timestamp to human-readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    useEffect(() => {
        document.querySelectorAll('.news-card h2').forEach(function(element) {
            var lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
            var maxHeight = lineHeight * 3; // Maximum height for 3 lines
            if (element.clientHeight > maxHeight) {
                var newFontSize = parseInt(window.getComputedStyle(element).fontSize) * maxHeight / element.clientHeight;
                element.style.fontSize = newFontSize + 'px';
                element.style.lineHeight = '1.2'; // Adjust line height to prevent overflow
                element.style.overflow = 'hidden'; // Hide any overflow
            }
        });
    }, []); // Run only once after initial render

    return (
        <a className="news-card" href={newsItem.url} target="_blank" rel="noopener noreferrer">
            {newsItem.image && <img src={newsItem.image} alt="News" />}
            <div className="date-badge">{formatDate(newsItem.datetime)}</div>
            <div className="news-card-content">
                <h2>{newsItem.headline}</h2>

                <div className="scrollableContainer">
                    <div className="newsCardsDivs">
                        <p style={{marginLeft:'100px'}}>Source: {newsItem.source}</p>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default CompanyNewsCard;
