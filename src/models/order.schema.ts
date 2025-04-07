import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    type: [
      {
        dishId: String,
        quantity: Number,
        toppings: [String],
        note: String,
      },
    ],
  })
  items: {
    dishId: string;
    quantity: number;
    toppings: string[];
    note?: string;
  }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
