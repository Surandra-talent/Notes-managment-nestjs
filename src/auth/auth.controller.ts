import { Body, Controller, Post, HttpCode, HttpStatus ,Request,UnauthorizedException,UseGuards,Get ,Req,ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service'; 
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../users/create-user.dto';

@Controller('auth')
export class AuthController {
    //constructor(private authService: AuthService) {}
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
      ) {}
    

   @HttpCode(HttpStatus.OK)

   @Post('register')
    // @UseFilters(new HttpExceptionFilter())
    async create(@Body(new ValidationPipe({transform:true})) createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Request() req) {
        console.log(req.body.username);
        console.log(req.body.password);
        const user = await this.authService.validateUser(req.body.username, req.body.password);
        console.log('user');
        console.log(user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Req() req: Request) {
        console.log('29');
     //   console.log(req);
        return req['user'];       
    }
}