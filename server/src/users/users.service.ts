import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  // Example method to find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Example method to create a new user
  async create(username: string, portfolio: { symbol: string; quantity: number }[]): Promise<User> {
    const newUser = new this.userModel({ username, portfolio });
    return newUser.save();
  }

    // Method to get a user's portfolio
    async getUserPortfolio(username: string): Promise<{ symbol: string; quantity: number }[]> {
      const user = await this.userModel.findOne({ username }).exec();
      
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      
      return user.portfolio;
    }

    async updatePortfolio(username: string, newPortfolio: { symbol: string; quantity: number }[]): Promise<{ symbol: string; quantity: number }[]> {
      // Validate the input
      if (!Array.isArray(newPortfolio) || newPortfolio.some(item => !item.symbol || typeof item.quantity !== 'number')) {
        throw new BadRequestException('Invalid portfolio data');
      }
  
      // Find the user
      const user = await this.userModel.findOne({ username }).exec();
  
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
  
      // Update the portfolio
      user.portfolio = newPortfolio;
      await user.save();
  
      // Return the updated portfolio
      return user.portfolio;
    }
}
