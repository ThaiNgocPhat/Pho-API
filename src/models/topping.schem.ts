import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Topping extends Document{
    @Prop({type: String, required: true})
    name: string;
}

export const ToppingSchema = SchemaFactory.createForClass(Topping);