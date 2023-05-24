import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      include: {
        all: true,
      },
    });

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      include: {
        all: true,
      },
    });
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

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      include: {
        all: true,
      },
    });
    console.log(users);
    return users;
  }

  getRoleByName(role: string): string {
    return Roles[role];
  }
}
