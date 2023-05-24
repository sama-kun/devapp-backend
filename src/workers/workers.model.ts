import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  HasOne,
  HasMany,
} from 'sequelize-typescript';

import * as bcrypt from 'bcryptjs';
import { Order } from 'src/orders/orders.model';
import { User } from 'src/users/users.model';
import { Position } from './workers-position.enum';

interface WorkerCreationAttrs {
  worker: User;
  salary: number;
  position: Position;
  orders?: Order[];
}

@Table({ tableName: 'workers' })
export class Worker extends Model<Worker, WorkerCreationAttrs> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @HasOne(() => User)
  worker: User;

  @Column({ type: DataType.FLOAT, allowNull: false })
  salary: number;

  @Column({ type: DataType.STRING, allowNull: false })
  position: Position;

  @HasMany(() => Order)
  orders: Order[];
}
