import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesQuard } from 'src/auth/roles.quard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    const user = this.userService.create(userDto);
    return user;
  }

  @UseGuards(RolesQuard)
  @Get()
  @Roles('ADMIN')
  async getAll() {
    return await this.userService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
