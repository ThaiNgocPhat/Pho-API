// dto/update-dish-quantity.dto.ts
import { IsNumber, IsString } from 'class-validator';

export class UpdateDishQuantityDto {
  @IsNumber()
  tableId: number;

  @IsNumber()
  groupId: number;

  @IsString()
  dishId: string;

  @IsNumber()
  quantity: number;
}
