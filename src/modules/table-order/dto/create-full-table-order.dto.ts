import { CreateTableDto } from './create-order-table.dto';
import { IsNumber } from 'class-validator';

export class CreateFullTableDto extends CreateTableDto {
  @IsNumber()
  tableId: number;
}
