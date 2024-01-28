import React, { useState, useEffect } from 'react';
import './css/stockQuote.css';

const fetch = require('node-fetch');

async function fetchCompanyNews(apiKey, symbol) {
    const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&token=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch company news');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching company news:', error.message);
        return null;
    }
}

async function createNewsCards(apiKey, symbol) {
    const news = await fetchCompanyNews(apiKey, symbol);
    if (!news) return [];

    const newsCards = news.map(article => {
        return {
            title: article.headline,
            imageURL: article.image,
            summary: article.summary,
            source: article.source,
            url: article.url
        };
    });

    return newsCards;
}

// Replace 'YOUR_API_KEY' with your actual Finnhub API key
const apiKey = cmqorppr01ql2lmsoc6gcmqorppr01ql2lmsoc70;
const companySymbol = 'AAPL'; // Replace with the symbol of the company you're interested in
createNewsCards(apiKey, companySymbol)
    .then(newsCards => {
        console.log(newsCards); // This will contain an array of news card objects for the specified company
        // You can use this array in your web application for visual display
    })
    .catch(error => console.error('Error:', error.message));


