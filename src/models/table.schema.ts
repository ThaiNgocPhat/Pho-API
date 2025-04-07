import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Table extends Document {
  @Prop({ type: Number, required: true })
  tableId: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
