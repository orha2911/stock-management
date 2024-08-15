import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { List, Typography, Spin, InputNumber, Button, Space, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import portfolioStore from './stores/PortfolioStore';
import { updatePortfolio } from './apiService';
import SearchBar from './SearchBar';

const { Title } = Typography;

const PortfolioPage = observer(() => {
  const navigate = useNavigate();
  const [editedPortfolio, setEditedPortfolio] = useState([]);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await portfolioStore.fetchPortfolio();
        setEditedPortfolio(portfolioStore.portfolio || []); // Ensure we have a valid array
      } catch (error) {
        message.error('Failed to fetch portfolio.');
      }
    };

    fetchData();
  }, []);

  const handleStockClick = (stockSymbol) => {
    navigate(`/stock/${stockSymbol}`);
  };

  const handleQuantityChange = (symbol, quantity) => {
    if (quantity !== undefined) {
      setEditedPortfolio(prevPortfolio => {
        const updatedPortfolio = prevPortfolio.map(stock =>
          stock.symbol === symbol ? { ...stock, quantity } : stock
        );
        setChangesMade(true);
        return updatedPortfolio;
      });
    }
  };

  const handleDeleteStock = (symbol) => {
    setEditedPortfolio(prevPortfolio => {
      const updatedPortfolio = prevPortfolio.filter(stock => stock.symbol !== symbol);
      setChangesMade(true);
      return updatedPortfolio;
    });
  };

  const handleSaveChanges = async () => {
    try {
      await updatePortfolio('johndoe', editedPortfolio);
      message.success('Changes saved successfully!');
      setChangesMade(false);
    } catch (error) {
      message.error('Failed to save changes.');
    }
  };

  if (!editedPortfolio.length) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Your Portfolio</Title>
      <SearchBar />

      <div style={{ marginBottom: '20px' }}>
        <Title level={4}>Portfolio</Title>
        <List
          bordered
          dataSource={editedPortfolio}
          renderItem={item => (
            <List.Item
              key={item.symbol}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ flex: 1 }}>
                <span
                  onClick={() => handleStockClick(item.symbol)}
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {item.symbol}
                </span>
                : 
                <InputNumber
                  min={0}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(item.symbol, value)}
                  style={{ marginLeft: '10px' }}
                />
                {' '}shares
              </div>
              <Popconfirm
                title="Are you sure you want to delete this stock?"
                onConfirm={() => handleDeleteStock(item.symbol)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </List.Item>
          )}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <Space>
          <Button
            type="primary"
            onClick={handleSaveChanges}
            disabled={!changesMade}
          >
            Save Changes
          </Button>
          <Button type="default" onClick={() => setEditedPortfolio(portfolioStore.portfolio || [])}>
            Discard Changes
          </Button>
        </Space>
      </div>
    </div>
  );
});

export default PortfolioPage;
