import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import portfolioStore from './PortfolioStore';

ReactDOM.render(
  <Provider portfolioStore={portfolioStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
