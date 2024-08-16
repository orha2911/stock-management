import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioPage from './PortfolioPage';
import StockDetailsPage from './StockDetailsPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/stock/:symbol" element={<StockDetailsPage />} />
    </Routes>
  </Router>
);

export default App;
