import { Schema, Document } from 'mongoose';

// Define the schema for the portfolio item
const portfolioItemSchema = new Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true }
});

// Define the schema for the user
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  portfolio: [portfolioItemSchema]
});

export interface User extends Document {
  username: string;
  portfolio: { symbol: string; quantity: number }[];
}

export const UserSchema = userSchema;
