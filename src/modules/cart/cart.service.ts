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

  // async addItemToCart(createCartDto: CreateCartDto): Promise<Cart> {
  //   const cart = await this.cartModel.findOne();

  //   // Chuyển đổi dishId thành ObjectId
  //   const dishId = new Types.ObjectId(createCartDto.dishId); // Chuyển 'dishId' từ string thành ObjectId

  //   // Lấy thông tin món ăn từ database
  //   const dish = await this.dishModel.findById(dishId);
  //   if (!dish) {
  //     throw new NotFoundException('Món ăn không tồn tại');
  //   }

  //   // Kiểm tra topping hợp lệ
  //   const toppings = createCartDto.toppings.map((topping) => topping.trim());

  //   const newItem: CartItem = {
  //     dishId: dishId, // Đảm bảo dishId là ObjectId
  //     toppings: toppings.length ? toppings : [], // Nếu không có topping thì để là mảng rỗng
  //     note: createCartDto.note,
  //     quantity: createCartDto.quantity,
  //   };

  //   if (cart) {
  //     // Nếu giỏ hàng đã tồn tại, thêm món vào giỏ
  //     cart.items.push(newItem);
  //     await cart.save();
  //     this.chatGateway.server.emit('orderReceived', cart); // Phát sự kiện WebSocket
  //     return cart;
  //   } else {
  //     // Nếu giỏ hàng chưa có, tạo giỏ hàng mới
  //     const newCart = new this.cartModel({
  //       items: [newItem],
  //       createdAt: new Date(),
  //     });
  //     const savedCart = await newCart.save();
  //     this.chatGateway.server.emit('orderReceived', savedCart); // Phát sự kiện WebSocket
  //     return savedCart;
  //   }
  // }

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
