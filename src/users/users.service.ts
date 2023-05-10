import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findByEmail(email: string): Promise<User> {
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

    return user;
  }

  async create(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);
    return user;
  }
}
