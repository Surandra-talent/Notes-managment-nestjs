import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'dg76786gd7t73h33ref',
      signOptions: { expiresIn: '60m' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
