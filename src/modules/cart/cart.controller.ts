import { Controller, Get, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { DeleteResult } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post()
  // async addToCart(@Body() createCartDto: CreateCartDto) {
  //   return await this.cartService.addItemToCart(createCartDto);
  // }

  @Get()
  async getCart() {
    return await this.cartService.getCart();
  }

  // cart.controller.ts
  @Delete()
  async clearCart(): Promise<DeleteResult> {
    return await this.cartService.cleanCart();
  }
}
