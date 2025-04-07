import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TableOder extends Document {
  @Prop({ required: true, unique: true })
  tableId: number;

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

  @Prop({
    type: [
      {
        groupId: Number,
        groupName: String,
        orders: [
          {
            dishId: String,
            name: String,
            quantity: Number,
            toppings: [String],
            note: String,
          },
        ],
      },
    ],
    default: [],
  })
  groups: {
    groupId: number;
    groupName: string;
    orders: {
      dishId: string;
      name: string;
      quantity: number;
      toppings: string[];
      note?: string;
    }[];
  }[];
}

export const TableOderSchema = SchemaFactory.createForClass(TableOder);
