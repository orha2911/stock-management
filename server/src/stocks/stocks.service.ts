import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StocksService {
  private apiUrl = 'https://financialmodelingprep.com/api/v3/quote-order';

  async getStockInfo(symbol: string): Promise<{ symbol: string; name: string; latestQuote: number; exchange: string }> {
    try {
        const response = await axios.get(`${this.apiUrl}/${symbol}?apikey=wUB2f7IOChwQEbWwYneVqckqG1Oak2LV`);
        const stockData = response.data[0]; // The API returns an array of objects
        // Map the API response to the desired format
        return {
          symbol: stockData.symbol,
          name: stockData.name, // The API doesn't provide a name, use symbol as name
          latestQuote: stockData.price,
          exchange: stockData.exchange
        };
      } catch (error) {
        console.error('Error fetching stock info:', error);
        throw new Error('Unable to fetch stock info');
      }
    }
}
