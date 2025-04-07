import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Hotpot } from 'src/models/hotpot.schema';

@Injectable()
export class HotpotService {
  constructor(
    @InjectModel(DbCollections.HOT_POT)
    private readonly hotPotModel: Model<Hotpot>,
  ) {}

  async createHotPot(price: string, note?: string) {
    const hotPot = new this.hotPotModel({
      price,
      note,
    });
    return await hotPot.save();
  }

  async getHotPot() {
    return await this.hotPotModel.find().exec();
  }

  async updateHotPot(id: string, price: string, note?: string) {
    return await this.hotPotModel.findByIdAndUpdate(id, { price, note }).exec();
  }

  async deleteHotPot(id: string) {
    return await this.hotPotModel.findByIdAndDelete(id).exec();
  }
}
