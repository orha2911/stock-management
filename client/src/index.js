import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import portfolioStore from './stores/PortfolioStore';
import stockStore from './stores/StockStore';

ReactDOM.render(
  <Provider portfolioStore={portfolioStore} stockStore={stockStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
