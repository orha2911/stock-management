import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getStockInfo, updatePortfolio } from './apiService'; 
import { Button, Input, Typography, Card, Spin, Alert } from 'antd';
import portfolioStore from './PortfolioStore';

const { Title, Text } = Typography;

const StockDetailsPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const username = 'johndoe'; 

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const data = await getStockInfo(symbol);
        setStock(data);
        setError('');
      } catch (error) {
        setError('Error fetching stock details');
        console.error('Error fetching stock details:', error);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  const handleAddToPortfolio = async () => {
    try {  
      // Update the portfolio locally
      const updatedPortfolio = portfolioStore.portfolio;
      const existingStockIndex = updatedPortfolio.findIndex(stock => stock.symbol === symbol);
      if (existingStockIndex > -1) {
        // Update quantity if stock already exists
        updatedPortfolio[existingStockIndex].quantity += Number(quantity);
      } else {
        // Add new stock if it doesn't exist
        updatedPortfolio.push({ symbol, quantity: Number(quantity) });
      }
    
      // Update the portfolio on the server
      await updatePortfolio(username, updatedPortfolio);
  
      // Navigate back to the portfolio page
      navigate('/');
    } catch (error) {
      setError('Error adding stock to portfolio');
      console.error('Error adding stock to portfolio:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Navigate back to the portfolio page
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
      {stock ? (
        <Card
          title={<Title level={2}>{stock.name} ({stock.symbol})</Title>}
          style={{ marginBottom: '20px' }}
        >
          <Text>Price: ${stock.latestQuote}</Text><br />
          <Text>Exchange: {stock.exchange}</Text><br />
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            style={{ width: '100px', marginTop: '10px' }}
          />
          <Button
            type="primary"
            onClick={handleAddToPortfolio}
            style={{ marginTop: '10px', marginRight: '10px' }}
          >
            Add to Portfolio
          </Button>
          <Button
            onClick={handleGoBack}
            style={{ marginTop: '10px' }}
          >
            Go Back to Portfolio
          </Button>
        </Card>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Spin tip="Loading..." />
        </div>
      )}
    </div>
  );
};

export default StockDetailsPage;
