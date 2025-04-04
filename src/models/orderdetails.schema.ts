import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class OrderItem extends Document {
    @Prop({ type: String, required: true }) 
    dish: string;

    @Prop({ type: [String], default: [] })
    toppings: string[];

    @Prop({ type: Number, required: true })
    quantity: number;

    @Prop({ type: String })
    note: string;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
