import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles.enum';
import { Model } from 'mongoose';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    console.log(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository
      .findById(id)
      .select('-password')
      .exec();
    console.log(user);
    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const role = this.getRoleByName(String(userDto.roles));
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    console.log(role);
    userDto.roles = [role];
    try {
      const user = await this.userRepository.create(userDto);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find().select('-password').exec();
    console.log(users);
    return users;
  }

  getRoleByName(role: string): string {
    return Roles[role];
  }
}
