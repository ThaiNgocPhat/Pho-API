import { Schema, Document, Types } from 'mongoose';

export interface CartItem {
  dishId: Types.ObjectId;
  toppings: string[];
  note?: string;
  quantity: number;
}

export interface Cart extends Document {
  items: CartItem[];
  createdAt: Date;
}

export const CartSchema = new Schema<Cart>(
  {
    items: [
      {
        dishId: { type: Types.ObjectId, required: true, ref: 'Dish' },
        toppings: { type: [String], required: true },
        note: { type: String, required: false },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
