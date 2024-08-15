import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface StockDocument extends Document {
  symbol: string;
  quantity: number;
}

@Schema()
export class Stock {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  quantity: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
