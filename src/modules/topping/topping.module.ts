import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { ToppingSchema } from 'src/models/topping.schem';
import { ToppingController } from './topping.controller';
import { ToppingService } from './topping.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: DbCollections.TOPPING, schema: ToppingSchema}])
  ],
  providers: [ToppingService],
  controllers: [ToppingController],
  exports: [ToppingService]
})
export class ToppingModule {}
