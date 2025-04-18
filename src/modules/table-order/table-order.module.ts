import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatModule } from 'src/chat/chat.module';
import { DbCollections } from 'src/common/contants';
import { TableOrderSchema } from 'src/models/table-order.schema';
import { OrderModule } from 'src/modules/order/order.module';
import { TableOderController } from 'src/modules/table-order/table-order.controller';
import { TableOderService } from 'src/modules/table-order/table-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.TABLE_ORDER, schema: TableOrderSchema },
    ]),
    OrderModule,
    ChatModule,
  ],
  providers: [TableOderService],
  controllers: [TableOderController],
  exports: [TableOderService, MongooseModule],
})
export class TableOderModule {}
