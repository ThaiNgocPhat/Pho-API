import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { DbCollections } from 'src/common/contants';
import { Cart, CartItem } from 'src/models/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(DbCollections.CART) private cartModel: Model<Cart>,
  ) {}

  async addItemToCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartModel.findOne();

    const newItem: CartItem = {
      dishId: createCartDto.dishId,
      toppings: createCartDto.toppings,
      note: createCartDto.note,
      quantity: createCartDto.quantity,
    };

    if (cart) {
      cart.items.push(newItem);
      await cart.save();
      return cart;
    } else {
      const newCart = new this.cartModel({
        items: [newItem],
        createdAt: new Date(),
      });
      return newCart.save();
    }
  }

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
