import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop() dishId: string;
  @Prop() name: string;
  @Prop() quantity: number;
  @Prop([String]) toppings: string[];
  @Prop() note?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
