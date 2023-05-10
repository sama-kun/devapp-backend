import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  async create(@Body() orderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderService.create(orderDto);

    return order;
  }

  // @Get('/my')
  // async getOrders(@Body() ) {

  // }
}
