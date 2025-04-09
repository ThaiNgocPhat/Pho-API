import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

// DTO cho món ăn
export class ItemDto {
  @IsString()
  dishId: string;

  @IsArray()
  @IsString({ each: true })
  toppings: string[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

// DTO cho bảng
// dto/create-order.dto.ts
export class CreateOrderDto {
  tableId: number;
  groupId: number;
  dishId: string;
  name: string;
  quantity: number;
  toppings: string[];
  note?: string;
}
