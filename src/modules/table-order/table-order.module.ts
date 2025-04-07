import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { TableOderSchema } from 'src/models/table-order.schema';
import { DishModule } from 'src/modules/dish/dish.module';
import { TableOderController } from 'src/modules/table-order/table-order.controller';
import { TableOderService } from 'src/modules/table-order/table-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.TABLE_ORDER, schema: TableOderSchema },
    ]),
    DishModule,
  ],
  providers: [TableOderService],
  controllers: [TableOderController],
  exports: [TableOderService, MongooseModule],
})
export class TableOderModule {}
