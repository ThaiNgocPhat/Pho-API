import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DishModule } from './modules/dish/dish.module';
import { ToppingModule } from './modules/topping/topping.module';
import { OrderModule } from 'src/modules/order/order.module';
import { OrderItemModule } from 'src/modules/orderdetails/orderdetails.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/pho-app-db-v2'),
    DishModule,
    ToppingModule,
    OrderModule,
    OrderItemModule
  ],
})
export class AppModule {}

