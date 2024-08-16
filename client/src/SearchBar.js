import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Alert, Card } from 'antd';
import { getStockInfo } from './apiService';

const { Title } = Typography;

const SearchBar = () => {
  const [symbol, setSymbol] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const data = await getStockInfo(symbol);
      setStockInfo(data);
      setError('');
    } catch (error) {
      setError('Stock not found');
      setStockInfo(null); // Clear previous stock info if error occurs
    }
  };

  const handleStockClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
      <Title level={3}>Search for a Stock</Title>
      <Input
        placeholder="Enter Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && <Alert message={error} type="error" showIcon style={{ marginTop: '10px' }} />}
      {stockInfo && (
        <Card
          style={{
            cursor: 'pointer',
            marginTop: '10px',
            padding: '10px',
            textAlign: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => handleStockClick(stockInfo.symbol)}
        >
          <Title level={4} style={{ marginBottom: '5px' }}>
            {stockInfo.name}
          </Title>
          <div>Symbol: {stockInfo.symbol}</div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
