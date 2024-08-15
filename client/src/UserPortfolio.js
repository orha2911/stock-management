import React, { useEffect, useState } from 'react';
import { getUserPortfolio, deleteStockFromPortfolio } from './apiService';

const UserPortfolio = ({ username }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUserPortfolio(username);
        setPortfolio(data.portfolio);
      } catch (err) {
        setError('Error fetching portfolio');
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]); // Fetch data whenever `username` changes

  const handleDelete = async (symbol) => {
    try {
      await deleteStockFromPortfolio(username, symbol);
      setPortfolio(portfolio.filter(stock => stock.symbol !== symbol));
    } catch (err) {
      setError('Error deleting stock');
      console.error('Error deleting stock:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{username}'s Portfolio</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {portfolio.length > 0 ? (
          portfolio.map(stock => (
            <li key={stock.symbol}>
              {stock.symbol} - {stock.quantity}
              <button onClick={() => handleDelete(stock.symbol)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No stocks in portfolio</p>
        )}
      </ul>
    </div>
  );
};

export default UserPortfolio;
