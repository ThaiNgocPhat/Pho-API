import { Body, Controller, Get, Post } from '@nestjs/common';
import { TableService } from 'src/modules/table/table.service';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  @Post()
  async createTable(@Body() body: { tableId: number }) {
    return await this.tableService.createTable(body.tableId);
  }

  @Get()
  async getAllTable(): Promise<any> {
    return await this.tableService.getAllTables();
  }
}
