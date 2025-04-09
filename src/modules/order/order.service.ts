import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Dish } from 'src/models/dish.schema';
import { Order } from 'src/models/order.schema';
import { Table } from 'src/models/table.schema';
import { CartService } from 'src/modules/cart/cart.service';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(DbCollections.ORDER) private readonly orderModel: Model<Order>,
    @InjectModel(DbCollections.DISH) private readonly dishModel: Model<Dish>,
    @InjectModel(DbCollections.TABLE) private readonly tableModel: Model<Table>,
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

  // // order.service.ts
  // async deleteDish(tableId: number, groupId: number, dishId: string) {
  //   const table = await this.tableModel.findOne({ tableId });
  //   if (!table) throw new NotFoundException('Không tìm thấy bàn');

  //   const group = table.groups.find((g) => g.groupId === groupId);
  //   if (!group) throw new NotFoundException('Không tìm thấy nhóm');

  //   group.orders = group.orders.filter((o) => o.dishId !== dishId);
  //   await table.save();

  //   return { message: 'Đã xoá món khỏi nhóm' };
  // }

  async deleteCartByGroup(groupId: string): Promise<void> {
    await this.orderModel.deleteMany({ groupId, isPaid: false }).exec();
  }

  async payGroup(groupId: string): Promise<{ message: string }> {
    const result = await this.orderModel.updateMany(
      { groupId, isPaid: false },
      { $set: { isPaid: true, paidAt: new Date() } },
    );

    if (result.modifiedCount === 0) {
      throw new NotFoundException('Không tìm thấy đơn nào để thanh toán.');
    }

    return { message: 'Thanh toán nhóm thành công.' };
  }
}
