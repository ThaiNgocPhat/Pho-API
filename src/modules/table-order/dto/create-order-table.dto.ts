import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
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

export class CreateTableDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
