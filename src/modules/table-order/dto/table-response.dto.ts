import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class OrderItemResponseDto {
  @IsString()
  dishId: string;

  @IsNumber()
  quantity: number;

  @IsArray()
  toppings: string[];

  @IsOptional() // Optional nếu có thể có hoặc không
  @IsString()
  note?: string; // Thêm trường ghi chú nếu cần
}

export class OrderResponseDto {
  @Transform(({ value }) => String(value)) // Chuyển _id thành string
  @IsString()
  _id: string;

  @IsArray()
  items: OrderItemResponseDto[];
}
