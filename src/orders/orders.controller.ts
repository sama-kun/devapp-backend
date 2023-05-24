import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesQuard } from 'src/auth/roles.quard';
import { User } from 'src/users/users.model';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @UseGuards(RolesQuard)
  @Post()
  @Roles('USER')
  async create(
    @Request() req: any,
    @Body() orderDto: CreateOrderDto
  ): Promise<Order> {
    const order = this.orderService.create(req.user, orderDto);

    return order;
  }

  @UseGuards(RolesQuard)
  @Get('/my')
  @Roles('USER')
  async getOrders(@Request() req: any): Promise<Order[]> {
    return this.orderService.getOrdersOfUser(req.user);
  }

  @UseGuards(RolesQuard)
  @Put('/my/:id')
  @Roles('USER')
  async update(
    @Request() req: any,
    @Param('id') id: number,
    @Body() order: CreateOrderDto
  ): Promise<Order> {
    return this.orderService.update(id, req.user, order);
  }

  @UseGuards(RolesQuard)
  @Get()
  @Roles('ADMIN', 'DEVELOP')
  async getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }
}
