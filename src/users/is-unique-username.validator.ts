
import { Injectable,Inject } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from './users.service'; // Adjust path as needed

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  //constructor(private readonly userService: UsersService) {}
  constructor(private readonly usersService: UsersService) {}
 // constructor(@Inject(UsersService) private readonly usersService: UsersService) {}
  async validate(username: string, args: ValidationArguments){
    console.log('username',username);
    console.log('service',this.usersService);
    const user = await this.usersService.findByUsername(username);
    console.log('user',user);
    return !user; // Return true if username is unique
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Username $value is already taken';
  }
}
