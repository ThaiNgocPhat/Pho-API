import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { OrderItemSchema } from 'src/models/orderdetails.schema';
import { DishModule } from 'src/modules/dish/dish.module';
import { OrderItemController } from 'src/modules/orderdetails/orderdetails.controller';
import { OrderItemService } from 'src/modules/orderdetails/orderdetails.service';



@Module({
  imports: [
    MongooseModule.forFeature([{name: DbCollections.ORDER_ITEM, schema: OrderItemSchema}]),
    DishModule
  ],
  providers: [OrderItemService],
  controllers: [OrderItemController],
  exports: [OrderItemService]
})
export class OrderItemModule {}
