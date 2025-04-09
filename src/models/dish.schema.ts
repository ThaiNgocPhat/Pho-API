import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Topping } from 'src/models/topping.schem';

@Schema()
export class Dish extends Document {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [Topping] }) toppings: Topping[];
}
export const DishSchema = SchemaFactory.createForClass(Dish);
