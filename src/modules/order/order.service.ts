import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Order } from 'src/models/order.schema';
import { OrderItemService } from 'src/modules/orderdetails/orderdetails.service';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(DbCollections.ORDER) private readonly orderModel: Model<Order>,
    private readonly orderItemService: OrderItemService,
  ) {}

  async placeOrder(sessionId: string) {
    const cartItems = await this.orderItemService.getCartItems();
    if (cartItems.length === 0) throw new Error('Giỏ hàng trống');

    const newOrder = new this.orderModel({
      sessionId,
      items: cartItems.map((item) => item._id),
    });

    const order = await newOrder.save();
    await this.orderItemService.clearCart(); 

    return order;
  }

  async getOrderHistory(sessionId: string): Promise<Order[]> {
    return this.orderModel.find({ sessionId }).populate('items').exec();
  }
}
