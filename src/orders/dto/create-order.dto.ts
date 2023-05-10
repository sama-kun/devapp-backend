import { User } from 'src/users/users.model';

export class CreateOrderDto {
  readonly price: string;
  readonly customer: number;
  readonly customerId: number;
}
