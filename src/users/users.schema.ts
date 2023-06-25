import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  //@Column({ type: DataType.STRING, unique: true, allowNull: false })
  @Prop()
  email: string;

  //@Column({ type: DataType.STRING, allowNull: false })
  @Prop()
  password: string;

  //@Column({ type: DataType.STRING, unique: true })
  @Prop()
  phone: string;

  //@Column({ type: DataType.NUMBER, unique: true })
  @Prop()
  bank: number;

  // @Column({
  //   type: DataType.ARRAY(DataType.STRING),
  //   allowNull: false,
  //   defaultValue: ['USER'],
  // })
  @Prop()
  roles: string[];

  // async setPassword(password: string) {
  //   this.password = await bcrypt.hash(password, 10);
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);
