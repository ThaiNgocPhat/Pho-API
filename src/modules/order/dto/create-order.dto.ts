import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsString()
  dishId: string;

  @IsNumber()
  quantity: number;

  @IsArray()
  @IsString({ each: true })
  toppings: string[];
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
