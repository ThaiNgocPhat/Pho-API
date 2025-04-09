import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Group, GroupSchema } from 'src/models/group.schema';

@Schema({ timestamps: true })
export class Table extends Document {
  @Prop({ required: true, unique: true })
  tableId: number;

  @Prop({ type: [GroupSchema], default: [] })
  groups: Group[];
}

export const TableSchema = SchemaFactory.createForClass(Table);
