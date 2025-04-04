import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Dish } from 'src/models/dish.schema';

@Injectable()
export class DishService {
    constructor(
        @InjectModel(DbCollections.DISH) private readonly dishModel: Model<Dish>
    ){}

    async createDish(input: { name: string }): Promise<Dish> {
        const createDish = new this.dishModel(input);
        return await createDish.save();
    }
    async listDish(): Promise<Dish[]>{
        return await this.dishModel.find().exec();
    }

    async updateDish(id: string, input: { name: string }): Promise<Dish> {
        const updateDish = await this.dishModel.findByIdAndUpdate(id, input, { new: true }).select('_id name');;
        if (!updateDish) throw new NotFoundException('Dish not found');
        return updateDish;
    }
    
    async deleteDish(id: string): Promise<void> {
        const deleteDish = await this.dishModel.findByIdAndDelete(id).select('_id');
        if (!deleteDish) throw new NotFoundException('Dish not found');
    }
}
