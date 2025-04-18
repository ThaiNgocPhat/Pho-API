import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DishModule } from './modules/dish/dish.module';
import { ToppingModule } from './modules/topping/topping.module';
import { HotpotModule } from 'src/modules/hotpot/hotpot.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { OrderModule } from 'src/modules/order/order.module';
import { TableOderModule } from 'src/modules/table-order/table-order.module';
import { TableModule } from 'src/modules/table/table.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/pho-app-db-v2',
    ),
    DishModule,
    ToppingModule,
    HotpotModule,
    CartModule,
    OrderModule,
    TableOderModule,
    TableModule,
    ChatModule,
  ],
})
export class AppModule {}
