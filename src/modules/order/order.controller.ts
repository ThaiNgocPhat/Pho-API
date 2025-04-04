import { Controller, Post, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':sessionId')
  async placeOrder(@Param('sessionId') sessionId: string) {
    return this.orderService.placeOrder(sessionId);
  }

  @Get(':sessionId')
  async getOrderHistory(@Param('sessionId') sessionId: string) {
    return this.orderService.getOrderHistory(sessionId);
  }
}
