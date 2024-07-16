import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';

function App() {
  const [cryptos, setCryptos] = useState([]);

  const fetchCrypto = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          sparkline: true,
          price_change_percentage: '7d',
        },
      });
      setCryptos(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchCrypto();
  }, []);

  const renderSpark = (sparkLineData) => (
    <div className='sparkline-container'>
      <Sparklines data={sparkLineData}>
        <SparklinesLine color="green" />
      </Sparklines>
    </div>
  );

  return (
    <div>
      <div className='crypto-list-container'>
        <h1 className='crypto-list-title'>The Price Of the cryptos : TODAY</h1>
        <table className='crypto-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H Change</th>
              <th>24H Volume</th>
              <th>Market Cap</th>
              <th>7D Chart</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={crypto.image} alt={`${crypto.name} logo`} className='crypto-logo' />
                </td>
                <td>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </td>
                <td>${crypto.current_price.toFixed(2)}</td>
                <td className={crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>{crypto.total_volume.toLocaleString()}</td>
                <td>{crypto.market_cap.toLocaleString()}</td>
                <td>{renderSpark(crypto.sparkline_in_7d.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
