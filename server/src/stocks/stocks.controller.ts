import { Controller, Get, Param } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get(':symbol')
  async getStockInfo(@Param('symbol') symbol: string) {
    return this.stocksService.getStockInfo(symbol);
  }
}
