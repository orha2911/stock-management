import { Controller,Get, Post, Param, Body, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username/portfolio')
  async getUserPortfolio(@Param('username') username: string) {
    try {
      return await this.usersService.getUserPortfolio(username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  @Post(':username/portfolio')
  async updatePortfolio(
    @Param('username') username: string,
    @Body() newPortfolio: any[]
  ) {
    try {
      return await this.usersService.updatePortfolio(username, newPortfolio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

}
