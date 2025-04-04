import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { OrderSchema } from 'src/models/order.schema';
import { OrderItemModule } from 'src/modules/orderdetails/orderdetails.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: DbCollections.ORDER, schema: OrderSchema}]),
    OrderItemModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
