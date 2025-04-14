import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsString()
  dishId: string;

  @IsArray()
  @IsString({ each: true })
  toppings: string[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  quantity: number;
}
