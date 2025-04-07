import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { GroupSchema } from 'src/models/group.schema';
import { GroupController } from 'src/modules/group/group.controller';
import { GroupService } from 'src/modules/group/group.service';
import { TableModule } from 'src/modules/table/table.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.GROUP, schema: GroupSchema },
    ]),
    TableModule,
  ],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService, MongooseModule],
})
export class GroupModule {}
