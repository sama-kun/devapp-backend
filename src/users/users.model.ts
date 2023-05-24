import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import * as bcrypt from 'bcryptjs';

interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  surname: string;
  phone: string;
  bank: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, unique: true })
  phone: string;

  @Column({ type: DataType.NUMBER, unique: true })
  bank: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: ['USER'],
  })
  roles: string[];

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }
}
