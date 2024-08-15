import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema'; // Import the schema
import { UsersService } from './users.service'; // Create this service
import { UsersController } from './users.controller'; // Create this controller

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UserService if needed in other modules
})
export class UserModule {}
