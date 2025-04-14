import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { DbCollections } from 'src/common/contants';
import { CartSchema } from 'src/models/cart.schema';
import { CartService } from 'src/modules/cart/cart.service';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { DishModule } from 'src/modules/dish/dish.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.CART, schema: CartSchema },
    ]),
    ChatModule,
    DishModule
  ],
  controllers: [CartController],
  providers: [CartService, ChatGateway],
  exports: [CartService, MongooseModule],
})
export class CartModule {}
