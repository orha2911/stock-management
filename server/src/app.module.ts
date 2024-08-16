import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { MONGO_URL } from './constants'

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

