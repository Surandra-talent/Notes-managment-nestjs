// role.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UniqueUsernameValidator } from './is-unique-username.validator'; // Adjust path as needed

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService,UniqueUsernameValidator],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
