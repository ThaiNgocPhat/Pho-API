import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Order, OrderSchema } from 'src/models/order.schema';

@Schema({ _id: false })
export class Topping {
  @Prop({ required: true })
  name: string;
}

@Schema()
export class Group {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop() tableId: string;
  @Prop() groupNumber: number;
  @Prop({ default: false }) isPaid: boolean;

  @Prop({ type: [OrderSchema], default: [] })
  orders: Order[];
}

export const ToppingSchema = SchemaFactory.createForClass(Topping);
export const GroupSchema = SchemaFactory.createForClass(Group);
