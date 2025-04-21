import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Cart } from 'src/models/cart.schema';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Dish } from 'src/models/dish.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(DbCollections.CART) private cartModel: Model<Cart>,
    @InjectModel(DbCollections.DISH) private dishModel: Model<Dish>,
    private readonly chatGateway: ChatGateway,
  ) {}

  async getCart(): Promise<Cart> {
    const cart = await this.cartModel.findOne();
    if (!cart) {
      return {
        items: [],
      } as unknown as Cart;
    }
    return cart;
  }
  async cleanCart(): Promise<DeleteResult> {
    return this.cartModel.deleteMany({});
  }
}
