import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { AddOrderToGroupDto } from 'src/modules/table-order/dto/add-order-to-group.dto';
import { TableOderService } from 'src/modules/table-order/table-order.service';

@Controller('table-order')
export class TableOderController {
  constructor(private readonly tableService: TableOderService) {}
  @Get()
  async getOrderByTable(@Query('tableId') tableId: number) {
    const data = await this.tableService.getOrderByTableId(tableId);
    if (!data) {
      throw new NotFoundException('Không tìm thấy dữ liệu bàn');
    }
    return data;
  }

  @Post('create-group')
  async createGroup(@Body() body: { tableId: number; groupName: string }) {
    return this.tableService.createGroup(body.tableId, body.groupName);
  }

  // table-order.controller.ts
  @Post()
  async addOrderToGroup(@Body() body: AddOrderToGroupDto) {
    return this.tableService.addOrderToGroup(body);
  }

  // group.controller.ts
  @Delete()
  async deleteGroup(@Body() body: { tableId: number; groupId: number }) {
    return this.tableService.deleteGroup(body.tableId, body.groupId);
  }

  @Delete('remove-dish')
  async removeDishFromGroup(
    @Body() body: { tableId: number; groupId: number; dishId: string },
  ) {
    return this.tableService.removeDishFromGroup(body);
  }
}
