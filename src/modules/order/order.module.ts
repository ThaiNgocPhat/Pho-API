import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { OrderSchema } from 'src/models/order.schema';
import { CartModule } from 'src/modules/cart/cart.module';
import { DishModule } from 'src/modules/dish/dish.module';
import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.ORDER, schema: OrderSchema },
    ]),
    DishModule,
    CartModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService, MongooseModule],
})
export class OrderModule {}
