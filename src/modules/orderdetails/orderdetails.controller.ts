import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { OrderItemService } from 'src/modules/orderdetails/orderdetails.service';

@Controller('cart')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async addToCart(@Body() data: { dishName: string, toppings: string[], quantity: number, note: string }) {
    return this.orderItemService.addToCart(data);
  }

  @Get()
  async getCartItems() {
    return this.orderItemService.getCartItems();
  }

  @Delete()
  async clearCart() {
    return this.orderItemService.clearCart();
  }
}
