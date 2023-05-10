import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: LoginDto) {
    const entity = this.userService.findByEmail(user.email);
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(
    registerDto: CreateUserDto
  ): Promise<{ access_token: string }> {
    const { email, password } = registerDto;

    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован'
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
