import { IsOptional, IsArray, IsString, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsString()
  dishId: string;

  @IsOptional()
  @IsArray()
  toppings?: string[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
