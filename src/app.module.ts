import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

console.log(String(process.env.POSTGRESS_PASSWORD));

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'devapp',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
