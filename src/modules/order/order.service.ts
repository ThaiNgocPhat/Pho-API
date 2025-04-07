import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Dish } from 'src/models/dish.schema';
import { Order } from 'src/models/order.schema';
import { CartService } from 'src/modules/cart/cart.service';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(DbCollections.ORDER) private readonly orderModel: Model<Order>,
    @InjectModel(DbCollections.DISH) private readonly dishModel: Model<Dish>,
    private readonly cartService: CartService,
  ) {}

  async create(body: CreateOrderDto) {
    const newOrder = new this.orderModel({
      items: body.items,
    });

    await newOrder.save();

    await this.cartService.cleanCart();

    return newOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }
}
