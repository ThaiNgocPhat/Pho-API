import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TableOder } from 'src/models/table-order.schema';
import { TableOderService } from 'src/modules/table-order/table-order.service';

@Controller('table-order')
export class TableOderController {
  constructor(private readonly tableService: TableOderService) {}
  @Post()
  async createOrderTable(@Body() body: { tableId: number; items: any[] }) {
    console.log('Received tableId:', body.tableId);
    return this.tableService.create(body);
  }

  @Get()
  async getAllOrdersTable(): Promise<TableOder[]> {
    return await this.tableService.getAllOrders();
  }

  @Get(':tableId')
  async getByTableId(@Param('tableId', ParseIntPipe) tableId: number) {
    return this.tableService.findByTableId(tableId);
  }
}
