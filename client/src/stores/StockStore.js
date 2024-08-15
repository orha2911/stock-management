// stockStore.js
import { makeAutoObservable } from 'mobx';
import { getStockInfo } from '../apiService';

class StockStore {
  stockData = {}; // Use an object to handle multiple stocks
  isLoading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchStock(symbol) {
    console.log('dddd ', this.stockData)
    if (this.stockData[symbol]) {
      // Data already in store, no need to fetch
      return;
    }
    this.isLoading = true;
    this.error = '';
    try {
      const data = await getStockInfo(symbol);
      this.stockData[symbol] = data; // Store data by symbol
    } catch (error) {
      this.error = 'Error fetching stock details';
      console.error('Error fetching stock details:', error);
    } finally {
      this.isLoading = false;
    }
  }

  clearStock(symbol) {
    delete this.stockData[symbol]; // Clear specific stock data
  }
}

const stockStore = new StockStore();
export default stockStore;
