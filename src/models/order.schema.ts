import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderItem, OrderItemSchema } from 'src/models/orderitem.schema';

@Schema()
export class Order extends Document {
  @Prop({ type: [OrderItemSchema] })
  items: OrderItem[];

  @Prop({ required: true, enum: ['takeaway', 'table'] })
  type: string;

  @Prop()
  groupId?: number;

  @Prop()
  groupName?: string;

  @Prop()
  tableId?: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
