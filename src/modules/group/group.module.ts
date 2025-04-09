import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { GroupSchema } from 'src/models/group.schema';
import { TableSchema } from 'src/models/table.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.GROUP, schema: GroupSchema },
      { name: DbCollections.TABLE, schema: TableSchema },
    ]),
  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
