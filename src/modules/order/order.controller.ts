import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  // @Delete('item')
  // async deleteDishFromGroup(
  //   @Query('tableId') tableId: number,
  //   @Query('groupId') groupId: number,
  //   @Query('dishId') dishId: string,
  // ) {
  //   return this.orderService.deleteDish(tableId, groupId, dishId);
  // }

  @Post('payment/:groupId')
  async payGroup(@Param('groupId') groupId: string) {
    return this.orderService.payGroup(groupId);
  }

  @Delete('cart/:groupId')
  async deleteCart(@Param('groupId') groupId: string) {
    return this.orderService.deleteCartByGroup(groupId);
  }
}
