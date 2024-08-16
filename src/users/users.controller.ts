import { Controller, Get, Post, Body , Param, Put, Delete ,UseFilters,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
//import { ValidationPipe } from '../pipes/validation.pipe';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  //   @Post('create')
  //  // @UseFilters(new HttpExceptionFilter())
  //   async create(@Body(new ValidationPipe({transform:true})) createUserDto: CreateUserDto) {
  //     return this.usersService.create(createUserDto);
  //   }
}
