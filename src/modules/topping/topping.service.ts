import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Topping } from 'src/models/topping.schem';

@Injectable()
export class ToppingService {
  constructor(
    @InjectModel(DbCollections.TOPPING)
    private readonly toppingModel: Model<Topping>,
  ) {}

  async createTopping(input: { name: string }): Promise<Topping> {
    const toppingExist = await this.toppingModel.findOne({ name: input.name });
    if (toppingExist) throw new NotFoundException('Topping already exist');
    const createTopping = new this.toppingModel(input);
    return await createTopping.save();
  }

  async listTopping(): Promise<Topping[]> {
    return await this.toppingModel.find().exec();
  }

  async updateTopping(id: string, input: { name: string }): Promise<Topping> {
    const updateTopping = await this.toppingModel
      .findByIdAndUpdate(id, input, { new: true })
      .select('_id name');
    if (!updateTopping) throw new NotFoundException('Topping not found');
    return updateTopping;
  }

  async deleteTopping(id: string): Promise<void> {
    const deleteTopping = await this.toppingModel
      .findByIdAndDelete(id)
      .select('_id');
    if (!deleteTopping) throw new NotFoundException('Topping not found');
  }
}
