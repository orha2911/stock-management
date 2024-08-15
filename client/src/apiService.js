import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your backend API URL

export const getUserPortfolio = async (username) => {
  const response = await axios.get(`${API_URL}/users/${username}/portfolio`);
  return response.data;
};

export const updatePortfolio = async (username, portfolio) => {
  const response = await axios.post(`${API_URL}/users/${username}/portfolio`, portfolio);
  return response.data;
};

export const deleteStockFromPortfolio = async (username, symbol) => {
  const response = await axios.delete(`${API_URL}/users/${username}/portfolio/${symbol}`);
  return response.data;
};

export const getStockInfo = async (symbol) => {
 // const response = await axios.get(`${API_URL}/stocks/${symbol}`);
 try {
  const response = await fetch(`https://financialmodelingprep.com/api/v3/quote-order/${symbol}?apikey=wUB2f7IOChwQEbWwYneVqckqG1Oak2LV`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const stock = await response.json();
  return {
    exchange: stock[0].exchange || 'N/A',
    symbol: stock[0].symbol || 'N/A',
    name: stock[0].name || 'N/A',
    latestQuote: stock[0].price || 'N/A'
  };
} catch (error) {
  console.error('Failed to fetch stock data:', error);
  throw error;
}
};
