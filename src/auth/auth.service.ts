import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.schema';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(dto.email);
    console.log(candidate);

    if (candidate) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.create({ ...dto, password: hash });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    console.log(user);
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    //console.log(userDto);
    const user = await this.userService.findByEmail(userDto.email);
    //console.log(user);
    const passwordCheck = await bcrypt.compare(userDto.password, user.password);

    if (passwordCheck && user) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect password or email' });
  }
}
