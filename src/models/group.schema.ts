import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true })
  tableId: number;

  @Prop({ required: true })
  groupId: number;

  @Prop({
    type: [
      {
        dishId: String,
        name: String,
        quantity: Number,
        toppings: [String],
        note: String,
      },
    ],
    default: [],
  })
  orders: {
    dishId: string;
    name: string;
    quantity: number;
    toppings: string[];
    note?: string;
  }[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
