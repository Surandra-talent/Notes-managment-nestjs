import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [DatabaseModule, UsersModule,AuthModule, NotesModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
