import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { API_URL, API_KEY} from '../constants'

@Injectable()
export class StocksService {


  async getStockInfo(symbol: string): Promise<{ symbol: string; name: string; latestQuote: number; exchange: string }> {
    try {
        const response = await axios.get(`${API_URL}/${symbol}?apikey=${API_KEY}`);
        const stockData = response.data[0]; // The API returns an array of objects
        // Map the API response to the desired format
        return {
          symbol: stockData.symbol,
          name: stockData.name,
          latestQuote: stockData.price,
          exchange: stockData.exchange
        };
      } catch (error) {
        console.error('Error fetching stock info:', error);
        throw new Error('Unable to fetch stock info');
      }
    }
}
