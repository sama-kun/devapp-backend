import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { EmailModule } from 'src/email/email.module';
dotenv.config();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    // forwardRef(() => UserModule),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_TOKEN_EXPIRES,
      },
    }),
    EmailModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
