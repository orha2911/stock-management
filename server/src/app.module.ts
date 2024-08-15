import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module'; // Adjust the path if necessary

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://orha2911:iMsqj3TgM0cTO4I0@cluster0.dyz5w.mongodb.net/'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

