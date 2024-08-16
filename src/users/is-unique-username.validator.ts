
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from './users.service'; // Adjust path as needed

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(username: string, args: ValidationArguments): Promise<boolean> {
    console.log('username',username);
    console.log(this.userService);
    const user = await this.userService.findByUsername(username);
    console.log('user',user);
    return !user; // Return true if username is unique
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Username $value is already taken';
  }
}
