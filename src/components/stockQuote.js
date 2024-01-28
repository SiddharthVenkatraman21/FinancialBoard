// import React, { useState, useEffect } from 'react';
// import Chart from 'react-apexcharts';
// import './css/stockQuote.css';

// function StockQuote() {
//   const defaultSymbol = 'MSFT'; // Default symbol
//   const [symbol, setSymbol] = useState(defaultSymbol);
//   const [inputSymbol, setInputSymbol] = useState(defaultSymbol);
//   const [quoteData, setQuoteData] = useState(null);
//   const [fetching, setFetching] = useState(false);
//   const [hideToolbar, setHideToolbar] = useState(false); // State to control hiding toolbar
//   const [chartOptions, setChartOptions] = useState({
//     series: [],
//     options: {
//       chart: {
//         type: 'candlestick',
//         height: 350,
//       },
//       title: {
//         text: 'Stock Price Movement',
//         align: 'left',
//       },
//       tooltip: {
//         enabled: false, // Disable tooltip
//       },
//       xaxis: {
//         type: 'datetime',
//         labels: {
//           show: false, // Hide x-axis labels
//         },
//       },
//       yaxis: {
//         tooltip: {
//           enabled: true,
//         },
//         labels: {
//           style: {
//             fontSize: '14px', // Adjust font size
//             fontWeight: 'bold', // Make labels bold
//             colors: '#ffffff', // Set label color
//           },
//         },
//       },
//       annotations: {
//         xaxis: [], // No initial annotations
//       },
//       crosshairs: {
//         show: false, // Hide vertical line when hovering
//       },
//     },
//   });

//   useEffect(() => {
//     // Fetch data for default symbol (MSFT) when component initially renders
//     fetchData(defaultSymbol);
//   }, []);
  
//   const handleSymbolChange = (event) => {
//     setInputSymbol(event.target.value);
//   };

//   const fetchData = (symbolToFetch) => {
//     setFetching(true);
//     fetch(`https://finnhub.io/api/v1/quote?symbol=${symbolToFetch}&token=cmqk9qhr01ql2lmsd0qgcmqk9qhr01ql2lmsd0r0`)
//       .then(response => response.json())
//       .then(data => {
//         setQuoteData(data);
//         setFetching(false);
//         updateChart(data);
//         // Define currentPriceLine here after quoteData.c is fetched
//         const currentPriceLine = {
//           yaxis: [
//             {
//               y: data.c,
//               borderColor: '#00E396',
//               label: {
//                 borderColor: '#00E396',
//                 style: {
//                   color: '#fff',
//                   background: '#00E396'
//                 },
//                 text: 'Current Price: ' + data.c.toFixed(2)
//               }
//             }
//           ]
//         };
//         setChartOptions(prevOptions => ({
//           ...prevOptions,
//           annotations: {
//             yaxis: [currentPriceLine],
//           },
//         }));
//       })
//       .catch(error => {
//         console.error('Error fetching quote data:', error);
//         setFetching(false);
//       });
//   };
  

//   const handleFetchData = () => {
//     setSymbol(inputSymbol);
//     fetchData(inputSymbol);
//   };

//   const getPerformanceColor = (value) => {
//     if (value > 0) {
//       return 'green';
//     } else if (value < 0) {
//       return 'red';
//     } else {
//       return 'white';
//     }
//   };

//   const updateChart = (data) => {
//     if (data) {
//       const isPriceIncreased = data.c > data.o;
//       const candleColor = isPriceIncreased ? '#4CAF50' : '#F44336';
  
//       const chartData = [{
//         data: [{
//           x: new Date().getTime(),
//           y: [data.o, data.h, data.l, data.pc],
//           fillColor: candleColor,
//         }],
//       }];
  
//       const currentPriceLine = {
//         y: data.c,
//         borderColor: '#00E396',
//         label: {
//           borderColor: '#00E396',
//           style: {
//             color: '#fff',
//             background: '#00E396'
//           },
//           text: 'Current Price: ' + data.c.toFixed(2),
//         },
//       };

//       setHideToolbar(true);
  
//       setChartOptions(prevOptions => ({
//         ...prevOptions,
//         annotations: {
//           yaxis: [currentPriceLine],
//         },
//         series: chartData,
//       }));
//     }
//   };
  

//   const currentPriceLine = quoteData && quoteData.c ? {
//     yaxis: [
//         {
//           y: quoteData.c,
//           borderColor: '#00E396',
//           label: {
//             borderColor: '#00E396',
//             style: {
//               color: '#fff',
//               background: '#00E396'
//             },
//             text: 'Y-axis annotation on 8800'
//           }
//         }
//       ]
//     } : null;

//   return (
//     <div className={`stock-quote-container ${hideToolbar ? 'hide-toolbar hover-disabled' : ''}`}>
//       <div>
//         <label htmlFor="symbolInput">Symbol:</label>
//         <input
//           type="text"
//           id="symbolInput"
//           className="symbol-input"
//           value={inputSymbol}
//           onChange={handleSymbolChange}
//         />
//         <button
//           className="fetch-button"
//           onClick={handleFetchData}
//           disabled={fetching}
//         >
//           {fetching ? 'Fetching...' : 'Fetch Quote'}
//         </button>
//       </div>
//       {quoteData && (
//         <div className="quote-data">
//           <p style={{ color: '#fff' }}>Symbol: {symbol}</p>
//           {quoteData.c && (
//             <p>Current Price: <span style={{ color: '#fdca40' }}>{quoteData.c}</span></p>
//           )}
//           {quoteData.h && (
//             <p>High Today: <span style={{ color: '#6096ba' }}>{quoteData.h}</span></p>
//           )}
//           {quoteData.l && (
//             <p>Low Today: <span style={{ color: '#b1ddf1' }}>{quoteData.l}</span></p>
//           )}
//           {quoteData.dp && (
//             <p>Percent Change: <span style={{ color: getPerformanceColor(quoteData.dp) }}>{quoteData.dp}</span></p>
//           )}
//           {/* Add more data as needed */}
//         </div>
//       )}
//       <Chart
//         options={chartOptions.options}
//         series={chartOptions.series}
//         type="candlestick"
//         height={350}
//         annotations={{ yaxis: [currentPriceLine] }}
//       />
//     </div>
//   );
// }

// export default StockQuote;
