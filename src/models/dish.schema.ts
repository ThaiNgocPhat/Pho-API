import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dish extends Document {
  @Prop({ type: String, required: true })
  name: string;
}
export const DishSchema = SchemaFactory.createForClass(Dish);
