import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/users.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepo: typeof Order,
    private readonly userService: UserService
  ) {}

  async create(user: User, orderDto: CreateOrderDto) {
    if (!user) {
      throw new NotFoundException(`Entity with ID "${user.id}" not found`);
    }

    try {
      const order = this.orderRepo.create({
        ...orderDto,
        customerId: user.id,
      });
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrdersOfUser(user: User): Promise<Order[]> {
    const orders = await this.orderRepo.findAll({
      where: {
        customerId: user.id,
      },
    });

    return orders;
  }

  async update(id: number, user: User, dto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepo.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Entity with ID "${id}" not found`);
    }
    if (user.id !== order.id) {
      throw new HttpException("You can't do it", HttpStatus.FORBIDDEN);
    }
    order.price = dto.price;
    order.description = dto.description;

    await order.save();

    // const updated = await this.orderRepo.update(order.id,dto);

    return order;
  }

  async getAll(): Promise<Order[]> {
    const orders = await this.orderRepo.findAll();
    return orders;
  }
}
