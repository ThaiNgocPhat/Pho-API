import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { TableSchema } from 'src/models/table.schema';
import { TableController } from 'src/modules/table/table.controller';
import { TableService } from 'src/modules/table/table.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.TABLE, schema: TableSchema },
    ]),
  ],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService, MongooseModule],
})
export class TableModule {}
