import { Injectable , UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
         
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
      }
    
      async login(user: any) {
        console.log('29999',user._doc.email);

        const payload = { username: user._doc.username, sub: user._doc._id };
        console.log('payload',payload);
        return {
          statusCode: '200',
          access_token: this.jwtService.sign(payload),
        };
      }
} 