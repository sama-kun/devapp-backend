import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return user;
  }

  @Get('test')
  async test(@Body() token: any) {
    return await this.authService.verifyToken(token);
  }
}
