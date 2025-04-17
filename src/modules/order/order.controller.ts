import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Order } from 'src/models/order.schema';
import { CreateCartDto } from 'src/modules/cart/dto/create-cart.dto';
import { OrderService } from 'src/modules/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() body: CreateCartDto) {
    console.log('Body nhận được ở BE:', body);
    return this.orderService.addItemToCart(body);
  }

  @Get()
  async getAllOrders(): Promise<any> {
    return await this.orderService.getAllOrders();
  }

  @Delete('cart/:groupId')
  async deleteCart(@Param('groupId') groupId: string) {
    return await this.orderService.deleteCartByGroup(groupId);
  }

  @Post('checkout')
  async checkout(): Promise<Order> {
    return await this.orderService.checkout();
  }
  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<any> {
    return await this.orderService.deleteOrder(id);
  }
}
