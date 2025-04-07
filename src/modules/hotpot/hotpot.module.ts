import { Module } from '@nestjs/common';
import { HotpotService } from './hotpot.service';
import { HotpotController } from './hotpot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { HotpotSchema } from 'src/models/hotpot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.HOT_POT, schema: HotpotSchema },
    ]),
  ],
  providers: [HotpotService],
  controllers: [HotpotController],
})
export class HotpotModule {}
