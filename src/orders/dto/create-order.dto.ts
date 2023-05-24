import { NotEmpty } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

export class CreateOrderDto {
  readonly price: number;

  readonly description: string;
}
