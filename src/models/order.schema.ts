import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderItem } from './orderdetails.schema';

@Schema()
export class Order extends Document {
    @Prop({ type: String, required: true })
    sessionId: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }] })
    items: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
