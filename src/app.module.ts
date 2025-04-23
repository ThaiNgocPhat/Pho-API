import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DishModule } from './modules/dish/dish.module';
import { ToppingModule } from './modules/topping/topping.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { OrderModule } from 'src/modules/order/order.module';
import { TableOderModule } from 'src/modules/table-order/table-order.module';
import { TableModule } from 'src/modules/table/table.module';
import { ChatModule } from 'src/chat/chat.module';
import { AppController } from 'src/app.controller';

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
    CartModule,
    OrderModule,
    TableOderModule,
    TableModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
