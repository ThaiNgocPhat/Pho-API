// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { Topping } from 'src/models/topping.schem';

// @Schema()
// export class Dish extends Document {
//   @Prop({ type: String, required: true })
//   name: string;
//   @Prop({ type: [Topping] }) toppings: Topping[];
// }
// export const DishSchema = SchemaFactory.createForClass(Dish);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Topping {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

@Schema()
export class Dish extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Topping], default: [] })
  toppings: Topping[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
