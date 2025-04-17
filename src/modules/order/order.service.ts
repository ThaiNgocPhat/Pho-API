import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ChatGateway } from 'src/chat/chat.gateway';
import { DbCollections } from 'src/common/contants';
import { Cart, CartItem } from 'src/models/cart.schema';
import { Dish } from 'src/models/dish.schema';
import { Order } from 'src/models/order.schema';
import { Table } from 'src/models/table.schema';
import { CreateCartDto } from 'src/modules/cart/dto/create-cart.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(DbCollections.ORDER) private readonly orderModel: Model<Order>,
    @InjectModel(DbCollections.DISH) private readonly dishModel: Model<Dish>,
    @InjectModel(DbCollections.TABLE) private readonly tableModel: Model<Table>,
    @InjectModel(DbCollections.CART) private readonly cartModel: Model<Cart>,
    private readonly chatGateway: ChatGateway,
  ) {}

  async addItemToCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartModel.findOne();

    // Chuyển đổi dishId thành ObjectId
    const dishId = new Types.ObjectId(createCartDto.dishId);

    // Lấy thông tin món ăn từ database
    const dish = await this.dishModel.findById(dishId);
    if (!dish) {
      throw new NotFoundException('Món ăn không tồn tại');
    }

    // Kiểm tra topping hợp lệ
    const toppings = createCartDto.toppings.map((topping) => topping.trim());

    const newItem: CartItem = {
      dishId: dishId,
      toppings: toppings.length ? toppings : [],
      note: createCartDto.note,
      quantity: createCartDto.quantity,
    };

    if (cart) {
      // Nếu giỏ hàng đã tồn tại, thêm món vào giỏ
      cart.items.push(newItem);
      await cart.save();
      this.chatGateway.server.emit('orderReceived', cart);
      return cart;
    } else {
      // Nếu giỏ hàng chưa có, tạo giỏ hàng mới
      const newCart = new this.cartModel({
        items: [newItem],
        createdAt: new Date(),
      });
      const savedCart = await newCart.save();
      this.chatGateway.server.emit('orderReceived', savedCart);
      return savedCart;
    }
  }
  async getAllOrders(): Promise<any[]> {
    const orders = await this.orderModel.find().populate('items.dishId').exec();

    return orders.map((order) => ({
      _id: order._id,
      type: order.type,
      items: order.items.map((item) => ({
        name: item.dishId?.name || 'Unknown dish',
        quantity: item.quantity,
        toppings: item.toppings.join(','),
        note: item.note || '',
      })),
    }));
  }

  async deleteCartByGroup(groupId: string): Promise<void> {
    await this.orderModel.deleteMany({ groupId, isPaid: false }).exec();
  }

  // order.service.ts
  async checkout(): Promise<Order> {
    const cart = await this.cartModel.findOne();

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    // Gán type mặc định là 'takeaway' (Mang về)
    const order = new this.orderModel({
      items: cart.items,
      createdAt: new Date(),
      type: 'takeaway', // Mặc định luôn là Mang về
    });

    const savedOrder = await order.save(); // Lưu đơn hàng vào cơ sở dữ liệu

    // Clear cart sau khi tạo order
    await this.cartModel.deleteMany({});

    // Emit socket cho bếp để nhận đơn hàng
    this.chatGateway.server.emit('orderReceived', savedOrder);

    return savedOrder;
  }

  async deleteOrder(orderId: string): Promise<any> {
    return await this.orderModel.findByIdAndDelete(orderId);
  }
}
