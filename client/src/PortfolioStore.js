import { makeAutoObservable, action } from 'mobx';
import { getUserPortfolio } from './apiService';

class PortfolioStore {
  portfolio = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this, {
      fetchPortfolio: action,
      setPortfolio: action,
      addStock: action,
    });
  }

  async fetchPortfolio() {
    if (this.portfolio.length > 0) {
      // Portfolio data already exists, no need to fetch
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      const data = await getUserPortfolio('johndoe');
      this.setPortfolio(data);
    } catch (error) {
      this.error = 'Failed to fetch portfolio';
      console.error('Failed to fetch portfolio', error);
    } finally {
      this.isLoading = false;
    }
  }


  setPortfolio(data) {
    this.portfolio = data;
  }
}

const portfolioStore = new PortfolioStore();
export default portfolioStore;
