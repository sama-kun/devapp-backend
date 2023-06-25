import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/users.module';
import { User } from './users/users.schema';
import { AuthModule } from './auth/auth.module';
//import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';

console.log(String(process.env.POSTGRESS_PASSWORD));

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_TOKEN_EXPIRES,
      },
    }),
    UserModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
