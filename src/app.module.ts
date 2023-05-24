import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
//import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Order } from './orders/orders.model';
import { WorkersModule } from './workers/workers.module';

console.log(String(process.env.POSTGRESS_PASSWORD));

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'DevApp',
      models: [User, Order],
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_TOKEN_EXPIRES,
      },
    }),
    UserModule,
    AuthModule,
    OrdersModule,
    WorkersModule,
  ],
})
export class AppModule {}
