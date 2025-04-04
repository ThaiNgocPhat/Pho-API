import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Dish } from 'src/models/dish.schema';
import { OrderItem } from 'src/models/orderdetails.schema';
@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(DbCollections.ORDER_ITEM) private readonly orderItemModel: Model<OrderItem>,
    @InjectModel(DbCollections.DISH) private dishModel: Model<Dish>,
  ) {}

  async addToCart(data: { dishName: string, toppings: string[], quantity?: number, note: string }) {
    const { dishName, toppings, quantity = 1, note } = data;
    const dish = await this.dishModel.findOne({ name: dishName }).exec();

    if (!dish) {
        throw new Error('Món ăn không tồn tại');
    }
    const orderItem = new this.orderItemModel({
        dish: dish._id,
        toppings: toppings,
        quantity: quantity,
        note: note,
    });

    return orderItem.save();
}
// async addToCart(data: { dishId: string, toppings: string[], quantity?: number, note: string }) {
//   console.log("🔍 Đang tìm món với ID:", data.dishId);
//   const dish = await this.dishModel.findById(data.dishId).exec();
//   if (!dish) {
//       console.log("❌ Không tìm thấy món ăn trong database!");
//       throw new Error('Món ăn không tồn tại');
//   }
//   const orderItem = new this.orderItemModel({
//       dish: dish._id,
//       toppings: data.toppings,
//       quantity: data.quantity || 1,
//       note: data.note,
//   });

//   return orderItem.save();
// }



  async getCartItems(): Promise<OrderItem[]> {
    return this.orderItemModel.find().populate("dish").exec();
}
  async clearCart(): Promise<void> {
    await this.orderItemModel.deleteMany({});
  }
}
