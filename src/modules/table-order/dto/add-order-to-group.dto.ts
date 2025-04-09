// dto/add-order-to-group.dto.ts
import { IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class AddOrderToGroupDto {
  @IsNumber()
  tableId: number;

  @IsNumber()
  groupId: number;

  @IsString()
  dishId: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsArray()
  toppings: string[];

  @IsOptional()
  @IsString()
  note?: string;
}
