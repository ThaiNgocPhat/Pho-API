import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Hotpot extends Document {
  @Prop({ type: String, required: true })
  price: string;

  @Prop({ type: String, required: false })
  note?: string;
}
export const HotpotSchema = SchemaFactory.createForClass(Hotpot);
