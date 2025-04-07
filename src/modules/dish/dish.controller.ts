import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from 'src/models/dish.schema';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  async createDish(@Body() input: { name: string }): Promise<Dish> {
    return this.dishService.createDish(input);
  }

  @Get()
  async getAllDishes(): Promise<Dish[]> {
    return this.dishService.listDish();
  }

  @Put(':id')
  async updateDish(
    @Param('id') id: string,
    @Body() input: { name: string },
  ): Promise<Dish> {
    return this.dishService.updateDish(id, input);
  }

  @Delete(':id')
  async deleteDish(@Param('id') id: string): Promise<void> {
    return this.dishService.deleteDish(id);
  }

  @Get(':id')
  async getDish(@Param('id') id: string): Promise<Dish> {
    return this.dishService.getDish(id);
  }
}
