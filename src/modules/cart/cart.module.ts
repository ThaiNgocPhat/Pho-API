import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { DbCollections } from 'src/common/contants';
import { CartSchema } from 'src/models/cart.schema';
import { CartService } from 'src/modules/cart/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.CART, schema: CartSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
