import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/config';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
