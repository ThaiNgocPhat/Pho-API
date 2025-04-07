import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';
import { OrderService } from 'src/modules/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.create(body);
  }

  @Get()
  async getAllOrders(): Promise<any> {
    return await this.orderService.getAllOrders();
  }
}
