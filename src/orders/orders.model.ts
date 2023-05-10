import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface OrderCreationAttrs {
  price: number;
  customerId: number;
  customer: User;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @BelongsTo(() => User)
  customer: User;
}
