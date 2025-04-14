import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Dish } from 'src/models/dish.schema';

@Schema()
export class Order extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Dish' })
  dishId: Dish;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop([String])
  toppings: string[];

  @Prop()
  note?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
