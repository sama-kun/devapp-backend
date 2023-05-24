import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UserModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    UserModule,
    SequelizeModule.forFeature([Order]),
    JwtModule,
    AuthModule,
  ],
})
export class OrdersModule {}
