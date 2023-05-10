import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepo: typeof Order,
    private readonly userService: UserService
  ) {}

  async create(orderDto: CreateOrderDto) {
    const user = await this.userService.findById(orderDto.customer);
    if (!user) {
      throw new NotFoundException(
        `Entity with ID "${orderDto.customer}" not found`
      );
    }

    const order = this.orderRepo.create({
      price: Number(orderDto.price),
      customer: user,
      customerId: orderDto.customerId,
    });

    return order;
  }

  async getOrdersOfUser(id: number) {
    const user = await this.userService.findById(id);
    const orders = await this.orderRepo.findAll({
      where: {
        customer: user,
      },
    });

    return orders;
  }
}
