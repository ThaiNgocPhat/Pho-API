import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dish } from 'src/models/dish.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { DbCollections } from 'src/common/contants';

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DbCollections.DISH })
  dishId: Dish;

  @Prop([String])
  toppings: string[];

  @Prop()
  note?: string;

  @Prop()
  quantity: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
