import { Injectable , NotFoundException, BadRequestException,ConflictException,ForbiddenException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { Console } from 'console';


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
      // const createdUser = new this.userModel(createUserDto);
      // return createdUser.save();
     try {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
      } catch (error) {
        console.log('error',error);
        if (error.name === 'ValidationError') {
          // Extract validation error messages
          const errorMessages = Object.values(error.errors).map((err: any) => err.message);
          throw new ForbiddenException(`Validation error: ${errorMessages.join(', ')}`);
        } else {
          // Handle other errors
          throw new ForbiddenException(`Error creating user: ${(error as Error).message}`);
        }
      }
      
    }

    async findByUsername(username: string): Promise<User> {
      console.log('888');
        return this.userModel.findOne({ username }).exec();
    }

    async IsUsernameExist(username: string): Promise<User | null> {
      console.log('9839893');
      // Adjust the logic according to your data source
      // For example:
       return this.userModel.findOne({ where: { username } });
      //return null; // Replace this with actual implementation
    }
}


