import { Controller, Get, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { DeleteResult } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

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
