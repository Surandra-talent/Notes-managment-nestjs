import { IsNotEmpty, IsString, IsAlphanumeric, MinLength, MaxLength ,Validate} from 'class-validator';
import { UniqueUsernameValidator } from './is-unique-username.validator';
export class CreateUserDto {
 
    // username: string;
    // password: string;
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    @Validate(UniqueUsernameValidator, { message: 'Username already exists' })
    username: string;
  
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
   // @MinLength(6, { message: 'Password must be at least 6 characters long' })
   // @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    password: string;  
}    