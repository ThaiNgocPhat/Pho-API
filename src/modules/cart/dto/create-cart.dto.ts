import {
  IsArray,
  IsOptional,
  IsString,
  IsInt,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsMongoId() // Kiểm tra tính hợp lệ của ObjectId
  dishId: Types.ObjectId;

  @IsArray()
  @IsString({ each: true })
  toppings: string[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsInt()
  quantity: number;
}
