import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollections } from 'src/common/contants';
import { DishSchema } from 'src/models/dish.schema';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbCollections.DISH, schema: DishSchema },
    ]),
  ],
  providers: [DishService],
  controllers: [DishController],
  exports: [DishService, MongooseModule],
})
export class DishModule {}
